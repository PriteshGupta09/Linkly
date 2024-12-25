'use client'
import React from 'react'
import Button from '../common/Button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ProfileContext from '@/app/context/ProfileContext'
import { useContext } from "react";
import LogOut from '../common/LogOut'
import LoginButton from '../common/LoginButton'

const Header = () => {

    const { profile } = useContext(ProfileContext);
    const [isUser, setIsUser] = useState()
    const [image, setImage] = useState('')
    useEffect(() => {
        if (profile) {
            setIsUser(true)
            const {email} = profile
            const sliceEmail = email.slice(0,2)
            setImage(sliceEmail.toUpperCase())
        }
    }, [profile])


    return (
        <>
            <nav className='p-5'>
                <div className='flex items-center justify-between w-[96vw]'>
                    <div>
                        <h1 className='word font-bold text-xl text-white'>Linkly</h1>
                    </div>
                    {isUser ?
                        <div className='flex'>
                            <LogOut />

                            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                <span className="font-medium text-gray-600 dark:text-gray-300">{image}</span>
                            </div>
                        </div>
                        :
                        <div>
                            <div className='flex'>
                            <LoginButton />
                                <Link href='/register' >
                                    <Button text="Register Now" />
                                </Link>
                            </div>
                        </div>

                    }
                </div>
            </nav >
        </>
    )
}

export default Header
