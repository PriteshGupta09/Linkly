'use client'
import React, { useState ,useContext } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import LinkSign from './LinkSign'
import Submit from '../common/Submit'
import QRCode from "qrcode";
import ToastSucess from '../layout/ToastSucess'
import ToastMessage from '../layout/ToastError'
import ProfileContext from '@/app/context/ProfileContext'

const CustomiseLink = (data) => {
    const {OriginalLink, loader} =  data
    const [CustomLink, setCustomLink] = useState('')
    const {updateProfile} = useContext(ProfileContext)

    const generateQRCode = async (ShortLink) => {
        try {
            if (ShortLink.trim()) {
                return await QRCode.toDataURL(ShortLink);
            }
            ToastMessage('Provide a valid URL');
        } catch (error) {
            console.error('QR Code generation error:', error);
            ToastMessage('Failed to generate QR Code.');
        }
    };


    async function HandleCustomizeLink() {
        loader(true)
        const FinalCustomLink = CustomLink.trim()
        if (!FinalCustomLink) {
            ToastMessage('Enter the Value of ShortLink.')
            loader(false)
            return
        }

        const Link = `${process.env.NEXT_PUBLIC_HOST}/${FinalCustomLink}`

        const QRCodeImage = await generateQRCode(Link);

        const CustomLinkData = {
            ShortLink: Link,
            OriginalLink: OriginalLink,
            ORCode: QRCodeImage,
            clicks: 0,
        }

        try {
            const response = await fetch("/api/link/linkdata", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(CustomLinkData),
            });

            const data = await response.json();

            if (response.ok) {
                loader(false)
                ToastSucess(data.message);
                updateProfile();
            } else {
                loader(false)
                ToastMessage(data.message);
            }
        } catch (error) {
            loader(false)
            console.error('Submission error:', error);
            ToastMessage('Internal Server Error, Try again later.');
        }
    }

    return (
        <div className='my-4 flex justify-center'>
            <div className='p-[2px] Grad-Color'>
                <div className=" bg-[#0B101B] p-2 border-radius">
                    <Dialog>
                        <DialogTrigger>Make Your Own Links</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Enter Your Own Custom Link.</DialogTitle>
                                <div className='relative w-fit'>
                                    <input className='bg-[#181E29] text-white outline-none px-12 py-3 rounded-full my-4' placeholder='Enter the Link.' onChange={(e) => { setCustomLink(e.target.value) }} />
                                    <div className='absolute top-8 left-2'>
                                        <LinkSign />
                                    </div>
                                    <div className='absolute top-[26px] right-2'>
                                        <button onClick={HandleCustomizeLink}><Submit /></button>
                                    </div>
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default CustomiseLink
