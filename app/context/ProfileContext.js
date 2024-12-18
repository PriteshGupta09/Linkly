"use client"; 

import { createContext, useState, useEffect } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("/api/user/profile", {
                    method: "POST",
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    setProfile(data.message);
                } else {
                    console.log(`Error: ${data.message}`)
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
            console.error(`Error updating profile: ${data.message}`);
          }
        } catch (error) {
          console.error("An error occurred while updating profile:", error);
        }
      };

    return (
        <ProfileContext.Provider value={{ profile, updateProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export default ProfileContext;
