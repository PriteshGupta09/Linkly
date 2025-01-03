'use client';

import React, { useState, useContext } from 'react';
import Button from '../common/Button';
import ProfileContext from '@/app/context/ProfileContext';
import QRCode from "qrcode";
import ToastMessage from '../layout/ToastError';
import ToastSucess from '../layout/ToastSucess';
import LinkSign from '../LinkInput/LinkSign'
import CustomiseLink from '../LinkInput/CustomiseLink';
import { saveDataToLocalStorageFirst } from '@/utils/localstorage-oper';
import { fetchDataFromLocalStorage } from '@/utils/localstorage-oper';

const LinkData = (loading) => {
  const {DataFromLinkCompo, loader, overflowhide} = loading

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
      ToastMessage('Failed to generate QR Code. Try again Later');
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
        loader(false)
        overflowhide(false)
        ToastSucess(data.message);
        updateProfile();
      } else {
        loader(false)
        overflowhide(false)
        ToastMessage(data.message);
      }
    } catch (error) {
      loader(false)
      overflowhide(false)
      console.error('Submission error:', error);
      ToastMessage('Internal Server Error, Try again later.');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    loader(true)
    overflowhide(true)

    if (!OriginalLink.startsWith('https://')) {
      loader(false)
      overflowhide(false)
      ToastMessage('Link is invalid.');
      return;
    }

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const shortURL = Array.from({ length: 5 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
    const ShortLink = `${process.env.NEXT_PUBLIC_HOST}/${shortURL}`;

    const QRCodeImage = await generateQRCode(ShortLink);

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');

    const TodayDate = `${year}-${month}-${day}`;

    const LinkData = {
      OriginalLink,
      ShortLink,
      ORCode: QRCodeImage,
      clicks: 0,
      Date: TodayDate,
    };

    if (profile) {
      await SendDatatoDB(LinkData);
    } else {
      const repeatOiginalLink = data.find((posts) => posts.OriginalLink == LinkData.OriginalLink)

      if (repeatOiginalLink) {
        loader(false)
        overflowhide(false)
        ToastMessage('Already a ShortLink is avaible for this Link.')
        return
      }

      const repeatShortLink = data.find((posts) => posts.ShortLink == LinkData.ShortLink)

      if (repeatShortLink) {
        loader(false)
        overflowhide(false)
        ToastMessage('Already a ShortLink is Generated, Try Another one')
        return
      }
      
      const SaveToLs = saveDataToLocalStorageFirst(LinkData)

      if(SaveToLs.success){
        DataFromLinkCompo(true)
        loader(false)
        overflowhide(false)
        ToastSucess(SaveToLs.message)
      }
      else{
        DataFromLinkCompo(false)
        loader(false)
        overflowhide(false)
        ToastMessage(SaveToLs.message)
      }
    }
  };

  return (
    <>
      <ToastSucess />
      <ToastMessage />
      <div className="flex justify-center">
        <form className="relative" onSubmit={handleSave}>
          <div className="absolute top-5 left-5">
            <LinkSign />
          </div>
          <input
            type="text"
            className="px-16 pr-40 py-4 w-[50vw] rounded-full outline-none bg-[#181E29]"
            name="link"
            placeholder="Enter the link here"
            value={OriginalLink}
            onChange={handleInputChange}
          />
          <div className="absolute top-[6px] right-0">
            <Button text="Shorten Now!" />
          </div>
          {(showMakeOwnLinkbtn && profile) && (
            <CustomiseLink OriginalLink={OriginalLink} loader={loader} />
          )}
        </form>
      </div>
    </>
  );
};

export default LinkData;
