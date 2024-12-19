'use client'
import React from 'react'
import Cube from '@/components/layout/Cube'
import ToastMessage from '@/components/layout/ToastError';
import Button from '@/components/common/Button';
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import ToastSucess from '@/components/layout/ToastSucess';
import ProfileContext from '../context/ProfileContext';

const Login = () => {
    const Router = useRouter()
    const {updateProfile} = useContext(ProfileContext)


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const LoginHandler = async (e)=>{
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
                setTimeout(()=>{
                    updateProfile()
                    Router.replace('/')
                },2000)
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
            <form onSubmit={(e)=>{LoginHandler(e)}} className="max-w-sm mx-auto w-96 bg-[#181E29] border-black p-10 rounded-lg shadow-2xl">
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="email" id="email" className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type="password" id="password" className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="outline-none w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Show Password</label>
                </div>
                    <Button text='Submit'/>
            </form>
        </div>
    )
}

export default Login
