'use client'
import React from 'react'
import Button from '../common/Button'
import Link from 'next/link'
import { useEffect, useState, useContext } from 'react'
import ProfileContext from '@/app/context/ProfileContext'
import LogOut from '../common/LogOut'
import LoginButton from '../common/LoginButton'
import Loader from '../common/Loader'

const Header = () => {

    const { profile } = useContext(ProfileContext);
    const [isUser, setIsUser] = useState(false)
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (profile) {
            setIsUser(true)
            const { email } = profile
            const sliceEmail = email.slice(0, 2)
            setImage(sliceEmail.toUpperCase())
        }
        // updateProfile()
        // console.log(profile)
    }, [profile])

    function showLoader(value) {
        setLoading(value)
    }

    function showProfile(value) {
        setIsUser(value)
    }

    return (
        <>
            {loading ? (
                <div className='relative h-screen w-screen bg-black/40 z-[999]'>
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <Loader />
                    </div>
                </div>
            ) : null}
            <nav className='p-5'>
                <div className='flex items-center justify-between w-[96vw]'>
                    <div>
                        <Link href='/'><h1 className='word font-bold text-xl text-white'>Linkly</h1></Link>
                    </div>
                    <div>
                        {isUser ?
                            <div className='flex'>
                                <LogOut showLoader={showLoader} showProfile={showProfile} />

                                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                    <span className="font-medium text-gray-600 dark:text-gray-300">{image}</span>
                                </div>
                            </div> :
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
                </div>
            </nav >
        </>
    )
}

export default Header
