"use client"; 

import { createContext, useState, useEffect } from "react";
import WebsiteStatingPage from "@/components/layout/WebsiteStatingPage";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [showLandingPage, setshowLandingPage] = useState(true)
    const [callUpdateProfile, setCallUpdateProfile] = useState(false)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("/api/user/profile", {
                    method: "POST",
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    setProfile(data.message);
                    setshowLandingPage(false)
                } else {
                    setshowLandingPage(false)
                }
            } catch (error) {
                console.error("An error occurred:", error);
                console.log('An error occured while Fetching Data.')
            }
        };
        if (!profile) fetchProfile();
    }, [profile]);

    const updateProfile = async () => {
        try {
          const response = await fetch("/api/user/profile", {
            method: "POST",
          });
    
          const data = await response.json();
    
          if (response.ok) {
            setProfile(data.message); // Update the profile state
          } else {
            console.log(`Error updating profile: ${data.message}`);
          }
        } catch (error) {
          console.log("An error occurred while updating profile:", error);
        }
      };

    function ToCallUpdateFile(value) {
      setCallUpdateProfile(value)
      if (value) {
        setProfile(null); 
      }
      setTimeout(() => {
          setCallUpdateProfile(false)
      }, 1000);
    }

    return (
        <ProfileContext.Provider value={{ profile, updateProfile, ToCallUpdateFile, callUpdateProfile}}>
        {showLandingPage ? <WebsiteStatingPage /> :(children)}
            
        </ProfileContext.Provider>
    );
};

export default ProfileContext;
