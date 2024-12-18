'use client'
import React from 'react'
import Button from '../common/Button'
import { useState } from 'react'
import { useContext } from 'react'
import ProfileContext from '@/app/context/ProfileContext'
import QRCode from "qrcode";
import { encryptData } from "@/utils/encryptions";
import ToastMessage from '../layout/ToastError'
import ToastSucess from '../layout/ToastSucess'

const LinkData = () => {
  const { profile } = useContext(ProfileContext)
  const { updateProfile } = useContext(ProfileContext);

  const [OriginalLink, setOriginalLink] = useState('')

  const generateQRCode = async (ShortLink) => {
    try {
      if (ShortLink.trim()) {
        const url = await QRCode.toDataURL(ShortLink);
        return url
      } else {
        ToastMessage('Provide a valid URL')
      }
    } catch (error) {
      return error
    }
  }

  const SendDatatoDB = async (LinkData) => {
    try {
      const response = await fetch("/api/link/linkdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LinkData),
      });

      const data = await response.json();

      if (response.ok) {
        ToastSucess(data.message)
        updateProfile()
      } else {
        ToastMessage(data.message)
      }
    } catch (error) {
      ToastMessage('An error while submitting form.')
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()

    const TrimLink = OriginalLink.trim()


    if (!TrimLink.includes('https://')) {
      ToastMessage('Link is invalid.')
      return
    }

    if (TrimLink == '') {
      ToastMessage('Enter the link first.')
      return
    }

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 5;
    let shortURL = "";
    let ShortLink;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      shortURL += characters[randomIndex];
    }
    ShortLink = `${process.env.NEXT_PUBLIC_HOST}/${shortURL}`


    const ORCode = await generateQRCode(ShortLink)

    const LinkData = {
      OriginalLink: TrimLink,
      ShortLink: ShortLink,
      ORCode: ORCode,
      clicks: 0,
    }


    if (profile) {
      SendDatatoDB(LinkData)
      return
    };

    ToastMessage('You have to create Account to create links.')
    // encryptData(LinkData)
  }


  return (
    <>
      <ToastMessage />
      <ToastSucess />
      <div className='flex justify-center'>
        <form className='relative' onSubmit={(e) => { handleSave(e) }}>
          <input onChange={(e) => { setOriginalLink(e.target.value) }} value={OriginalLink} type='text' className='px-16 py-4 w-[50vw] rounded-full outline-none  bg-[#181E29]' name='link' placeholder='Enter the link here' />
          <div className='absolute top-[6px] right-0'>
            <Button text="Shorten Now!" />
          </div>
        </form>
      </div>
    </>
  )
}

export default LinkData
