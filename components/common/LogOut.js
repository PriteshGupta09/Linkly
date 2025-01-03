'use client'
import React, {useContext} from 'react'
import { useRouter } from 'next/navigation';
import ToastMessage from '../layout/ToastError';
import ToastSucess from '../layout/ToastSucess';
import ProfileContext from '@/app/context/ProfileContext';

const LogOut = (data) => {
    const {showProfile, showLoader} = data

    const Router = useRouter()

    const {ToCallUpdateFile} = useContext(ProfileContext)

    async function LogOut() {
        showLoader(true)
        try {
            const response = await fetch("/api/user/logout", {
                method: "POST"
            });

            const data = await response.json();

            if (response.ok) {
                ToastSucess(data.message)
                ToCallUpdateFile(true)
                setTimeout(() => {
                    showProfile(false)
                    showLoader(false)
                    Router.replace('/login')
                }, 2000)
            } else {
                showLoader(false)
                showProfile(true)
                ToastMessage(data.message)
            }
        } catch (error) {
            showLoader(false)
            showProfile(true)
            ToastMessage('Error while logout, Try again later.')
        }
    }

    return (
        <>
            <ToastMessage />
            <ToastSucess />
            <button onClick={LogOut} className="bg-[#181E29] flex items-center px-4 py-3 rounded-full mx-2 text-white"><p className='text-sm font-bold mr-1'>Log out</p></button>
        </>
    )
}

export default LogOut
