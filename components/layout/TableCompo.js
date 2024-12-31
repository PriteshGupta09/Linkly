"use client";
import React, { useEffect, useState, useContext } from "react";
import Edit from "./Edit";
import Image from "next/image";
import ProfileContext from "@/app/context/ProfileContext";
import ToastMessage from "./ToastError";
import ToastSucess from "./ToastSucess";
import { fetchDataFromLocalStorage } from "@/utils/localstorage-oper";
import { deleteLink } from "@/utils/localstorage-oper";
import { updateCount } from "@/utils/localstorage-oper";

const TableCompo = ({loadDatafromLocal}) => {

  const [links, setLinks] = useState([]);
  const [linksLocal, setLinksLocal] = useState(fetchDataFromLocalStorage());
  const { profile, updateProfile } = useContext(ProfileContext);
  // Populate `links` from profile data
  useEffect(() => {
    if (profile?.data) {
      setLinks(profile.data);
    }
  }, [profile]);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setLinksLocal(fetchDataFromLocalStorage());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const data = fetchDataFromLocalStorage()
    setLinksLocal(data)

  }, [loadDatafromLocal])

  const handleDeleteLink = async (ShortLink) => {

   const deletefromlocal = deleteLink(ShortLink);
   if(deletefromlocal){
     setLinksLocal(fetchDataFromLocalStorage());
      alert('Delete Successfully')
      return
   }

    try {
      const response = await fetch("/api/link/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ShortLink }),
      });

      const data = await response.json();
      if (response.ok) {
        updateProfile();
        ToastSucess(data.message);
      } else {
        ToastMessage(data.message);
      }
    } catch (error) {
      console.error("Error deleting link:", error);
      ToastMessage("An error occurred while deleting the link.");
    }
  };

  const handleUpdateCount = async (ShortLink) => {
   const updatefromlocal = updateCount(ShortLink);
   if(updatefromlocal){
     setLinksLocal(fetchDataFromLocalStorage());
     return
   }

    try {
      const response = await fetch("/api/link/updatevalue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ShortLink }),
      });

      const data = await response.json();
      if (response.ok) {
        updateProfile();
      } else {
        ToastMessage(data.message);
      }
    } catch (error) {
      console.error("Error updating click count:", error);
      ToastMessage("An error occurred while updating the clicks.");
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <ToastMessage />
      <ToastSucess />
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            <th className="px-6 py-3 text-center">Short Link</th>
            <th className="px-6 py-3 text-center">Original Link</th>
            <th className="px-6 py-3 text-center">QR Code</th>
            <th className="px-6 py-3 text-center">Clicks</th>
            <th className="px-6 py-3 text-center">Date</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(links.length > 0 || linksLocal.length > 0) ? (
            (links.length > 0 ? links : linksLocal).map((link, index) => (
              <tr key={index} className="bg-[#181E29] border-b border-gray-700">
                <th className="px-6 py-4 font-medium text-white w-[27%]">
                  <a
                    href={link.OriginalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleUpdateCount(link.ShortLink)}
                  >
                    {link.ShortLink}
                  </a>
                </th>
                <td className="px-6 py-4 truncate-multiline w-96">{link.OriginalLink}</td>
                <td className="px-6 py-4 text-center">
                  <Image src={link.ORcode || link.ORCode} height={75} width={75} alt="QR Code" />
                </td>
                <td className="px-6 py-4 text-center">{link.clicks}</td>
                <td className="px-6 py-4 text-center">
                  {link.Date ? link.Date.split("T")[0] : "N/A"}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDeleteLink(link.ShortLink)}
                    className="text-red-500"
                  >
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
