'use client'
import React from 'react'
import Cube from '@/components/layout/Cube'
import ToastMessage from '@/components/layout/ToastError';
import Button from '@/components/common/Button';
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import ToastSucess from '@/components/layout/ToastSucess';
import ProfileContext from '../context/ProfileContext';
import ForgotPassword from '@/components/Login/ForgotPassword';

const Login = () => {
    const Router = useRouter()
    const { updateProfile } = useContext(ProfileContext)


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)

    const LoginHandler = async (e) => {
        e.preventDefault()
        if (email == '' || password == '') {
            ToastMessage('Enter the value First.')
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
                    Router.replace('/')
                }, 2000)
            } else {
                ToastMessage(data.message)
            }
        } catch (error) {
            ToastMessage('An Error While Submitting Form.')
        }
    }

    return (
        <div className='h-screen flex items-center'>
            <ToastSucess />
            <ToastMessage />
            <div className='absolute top-60 right-12'>
                <Cube height='300' width='300' />
            </div>
            <form onSubmit={(e) => { LoginHandler(e) }} className="max-w-sm mx-auto w-96 bg-[#181E29] border-black p-10 rounded-lg shadow-2xl">
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                    <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" id="email" className=" border outline-none  text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name@example.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Your password</label>
                    <input onChange={(e) => { setPassword(e.target.value) }} value={password} type={showPass ? 'text': 'password'} id="password" className=" border outline-none  text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <div className='flex justify-between'>
                    <div className="flex items-start mb-5">
                        <div className="flex items-center h-5">
                            <input id="remember" onClick={()=>{setShowPass(!showPass)}} type="checkbox" value="" className="outline-none w-4 h-4 border rounded  focus:ring-3 bg-gray-700 border-gray-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800" />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium  text-gray-300">Show Password</label>
                    </div>
                    <div className=''>
                        <ForgotPassword />
                    </div>
                </div>
                <Button text='Submit' />
            </form>
        </div>
    )
}

export default Login
