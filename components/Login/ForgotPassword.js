'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Submit from '../common/Submit'
import Email from './Email'
import ToastMessage from '../layout/ToastError'
import ToastSucess from '../layout/ToastSucess'

const ForgotPassword = ({loading}) => {
    const [email, setEmail] = useState('')

    async function HandleEmail() {
        loading(true)
        if(!email){
            ToastMessage('Enter Your Email.')
            loading(false)
            return
        }

        try {
            const response = await fetch(`/api/user/forgot-password-handler`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(email),
            });

            const data = await response.json();

            if (response.ok) {
                ToastSucess(data.message)
                loading(false)
            } else {
                ToastMessage(data.message)
                loading(false)
            }
        } catch (error) {
            loading(false)
            ToastMessage('Internal Server Error, Try again later.')
        }
    }

    return (
        <Dialog>
            <DialogTrigger className='text-blue-600'>Forgot Password?</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enter Your Email</DialogTitle>
                    <div className='relative w-fit'>
                        <input type='email' className='bg-[#181E29] text-white outline-none px-12 py-3 rounded-full my-4' placeholder='example@example.com' onChange={(e) => { setEmail(e.target.value) }} />
                        <div className='absolute top-8 left-4'>
                            <Email />
                        </div>
                        <div className='absolute top-[26px] right-2'>
                            <button onClick={HandleEmail}><Submit /></button>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default ForgotPassword
