'use client';

import React, { useState, useContext } from 'react';
import Button from '../common/Button';
import ProfileContext from '@/app/context/ProfileContext';
import QRCode from "qrcode";
import ToastMessage from '../layout/ToastError';
import ToastSucess from '../layout/ToastSucess';
import LinkSign from '../LinkInput/LinkSign'
import CustomiseLink from '../LinkInput/CustomiseLink';
import { saveDataToLocalStorage } from '@/utils/encryptions';
import { fetchDataFromLocalStorage } from '../layout/TableCompo';

const LinkData = () => {
  const data = fetchDataFromLocalStorage()
  const { profile, updateProfile } = useContext(ProfileContext);
  const [showMakeOwnLinkbtn, setShowMakeOwnLinkbtn] = useState(false);
  const [OriginalLink, setOriginalLink] = useState('');

  function handleInputChange(e) {
    const value = e.target.value.trim();
    setOriginalLink(value);

    if (value && value.startsWith('https://')) {
      setShowMakeOwnLinkbtn(true);
    } else {
      setShowMakeOwnLinkbtn(false);
    }
  }

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
        ToastSucess(data.message);
        updateProfile();
      } else {
        ToastMessage(data.message);
      }
    } catch (error) {
      console.error('Submission error:', error);
      ToastMessage('An error occurred while submitting the form.');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!OriginalLink.startsWith('https://')) {
      ToastMessage('Link is invalid.');
      return;
    }

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const shortURL = Array.from({ length: 5 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
    const ShortLink = `${process.env.NEXT_PUBLIC_HOST}/${shortURL}`;

    const QRCodeImage = await generateQRCode(ShortLink);

    const LinkData = {
      OriginalLink,
      ShortLink,
      ORCode: QRCodeImage,
      clicks: 0,
    };

    if (profile) {
      await SendDatatoDB(LinkData);
    } else {
      const repeatOiginalLink = data.find((posts) => posts.OriginalLink == LinkData.OriginalLink)

      if(repeatOiginalLink){
        alert('The Link is already used')
        return
      }

      const repeatShortLink = data.find((posts)=> posts.ShortLink == LinkData.ShortLink)

      if(repeatShortLink){
        alert('ShortLink is alraedy generated for this Link')
        return
      }

      saveDataToLocalStorage(LinkData)
    }
  };

  return (
    <>
      <ToastMessage />
      <ToastSucess />
      <div className="flex justify-center">
        <form className="relative" onSubmit={handleSave}>
          <div className="absolute top-5 left-5">
            <LinkSign />
          </div>
          <input
            type="text"
            className="px-16 py-4 w-[50vw] rounded-full outline-none bg-[#181E29]"
            name="link"
            placeholder="Enter the link here"
            value={OriginalLink}
            onChange={handleInputChange}
          />
          <div className="absolute top-[6px] right-0">
            <Button text="Shorten Now!" />
          </div>
          {(showMakeOwnLinkbtn && profile) && (
            <CustomiseLink OriginalLink={OriginalLink}/>
          )}
        </form>
      </div>
    </>
  );
};

export default LinkData;
