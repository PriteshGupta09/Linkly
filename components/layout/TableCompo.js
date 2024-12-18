'use client'
import React, { useEffect, useState, useContext } from 'react'
import Edit from './Edit'
import Image from 'next/image'
import ProfileContext from '@/app/context/ProfileContext'
import ToastMessage from './ToastError'
import ToastSucess from './ToastSucess'

const TableCompo = () => {
  const [links, setLinks] = useState([]);
  const { profile } = useContext(ProfileContext);
  const {updateProfile} = useContext(ProfileContext)
  // Populate links from profile data
  useEffect(() => {
    if (profile?.data) {
      setLinks(profile.data);
    }
  }, [profile]);


  async function DeleteLink(ShortLink) {
    try {
      const response = await fetch("/api/link/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ShortLink),
      });

      const data = await response.json();

      if (response.ok) {
        updateProfile()
        ToastSucess(data.message)
      } else {
        ToastMessage(data.message)
      }
    } catch (error) {
      console.error("An error occurred:", error);
      ToastMessage('An error while deleting Link')
    }
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <ToastMessage />
      <ToastSucess />
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Short Link</th>
            <th className="px-6 py-3">Original Link</th>
            <th className="px-6 py-3">QR Code</th>
            <th className="px-6 py-3">Clicks</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.length > 0 ? (
            links.map((link, index) => (
              <tr key={index} className="bg-[#181E29] border-b dark:border-gray-700">
                <th className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  <a href={link.OriginalLink} target='_blank'>{link.ShortLink}</a>
                </th>
                <td className="px-6 py-4">{link.OriginalLink}</td>
                <td className="px-6 py-4">
                  <Image src={link.ORcode} height={75} width={75} alt="QR Code" />
                </td>
                <td className="px-6 py-4">{link.clicks}</td>
                <td className="px-6 py-4">{link.Date}</td>
                <td className={`px-6 py-4 delete`} id={index}>
                  <button onClick={() => { DeleteLink(link.ShortLink) }}>
                    <Edit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableCompo;
