'use client'
import React, {useContext} from 'react'
import { useRouter } from 'next/navigation';
import ToastMessage from '../layout/ToastError';
import ToastSucess from '../layout/ToastSucess';
import ProfileContext from '@/app/context/ProfileContext';

const LogOut = () => {
    const Router = useRouter()
    const {updateProfile} = useContext(ProfileContext)

    async function LogOut() {
        try {
            const response = await fetch("/api/user/logout", {
                method: "POST"
            });

            const data = await response.json();

            if (response.ok) {
                setTimeout(()=>{
                    updateProfile()
                    Router.replace('/login')
                },2000)
                ToastSucess(data.message)
            } else {
                ToastMessage(data.message)
            }
        } catch (error) {
            ToastMessage('An error while submitting form.')
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
