'use client'
import React from 'react'
import Cube from '@/components/layout/Cube'
import ToastMessage from '@/components/layout/ToastError';
import Button from '@/components/common/Button';
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import ToastSucess from '@/components/layout/ToastSucess';
import ProfileContext from '@/app/context/ProfileContext';
import ForgotPassword from '@/components/Login/ForgotPassword';
import Loader from '@/components/common/Loader';

const LoginData = () => {
    const Router = useRouter()
    const { updateProfile } = useContext(ProfileContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [loader, setLoader] = useState(false)

    function loading(load) {
        setLoader(load)
    }

    const LoginHandler = async (e) => {
        e.preventDefault()
        setLoader(true)
        if (email == '' || password == '') {
            ToastMessage('Email and Password are Required.')
            setLoader(false)
            return
        }

        const Formdata = {
            email: email,
            password: password,
        }

        try {
            const response = await fetch(`/api/user/login-handler`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Formdata),
            });

            const data = await response.json();

            if (response.ok) {
                ToastSucess(data.message)
                setTimeout(() => {
                    updateProfile()
                    setLoader(false)
                    Router.replace('/')
                }, 2000)
            } else {
                ToastMessage(data.message)
                setLoader(false)
            }
        } catch (error) {
            setLoader(false)
            ToastMessage('Try again Later.')
        }
    }

    return (
        <>

            {loader ? (
                <div className='relative h-screen w-screen bg-black/40 z-[999]'>
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <Loader />
                    </div>
                </div>
            ) : null}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <ToastSucess />
                <ToastMessage />
                <div className='absolute top-40 -right-60 z-[-12]'>
                    <Cube height='300' width='300' />
                </div>
                <form onSubmit={(e) => { LoginHandler(e) }} className="max-w-sm mx-auto w-96 bg-[#181E29] border-black p-10 rounded-lg shadow-2xl">
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                        <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" id="email" className=" border outline-none  text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name@example.com" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Your password</label>
                        <input onChange={(e) => { setPassword(e.target.value) }} value={password} type={showPass ? 'text' : 'password'} id="password" className=" border outline-none  text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div className='flex justify-between'>
                        <div className="flex items-start mb-5">
                            <div className="flex items-center h-5">
                                <input id="remember" onClick={() => { setShowPass(!showPass) }} type="checkbox" value="" className="outline-none w-4 h-4 border rounded  focus:ring-3 bg-gray-700 border-gray-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800" />
                            </div>
                            <label htmlFor="remember" className="ms-2 text-sm font-medium  text-gray-300">Show Password</label>
                        </div>
                        <div className=''>
                            <ForgotPassword loading={loading} />
                        </div>
                    </div>
                    <Button text='Submit' />
                </form>
            </div>
        </>
    )
}

export default LoginData
