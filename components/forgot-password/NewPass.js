'use client'
import React, { useState } from 'react'
import Button from '../common/Button'
import Cube from '../layout/Cube'
import ToastMessage from '../layout/ToastError'
import ToastSucess from '../layout/ToastSucess'
import { useSearchParams } from 'next/navigation'

const NewPass = () => {
    const searchParams = useSearchParams()

    const token = searchParams.get('token')

    const [Password, setPassword] = useState('')
    const [confirm_pass, setConfirm_pass] = useState('')
    const [showPass, setShowPass] = useState(false)

    async function HandleNewPass(e) {
        e.preventDefault()

        if (!Password || !confirm_pass) {
            alert('Enter the Password in both fields')
        }

        if (Password !== confirm_pass) {
            alert('Enter Same Password in both fields.')
        }


        const NewPassData = {
            Password: Password,
            Confirm_Pass: confirm_pass,
            token: token
        }

        try {
            const response = await fetch("/api/user/newpass", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(NewPassData),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message)
            } else {
                alert(data.message)
            }
        } catch (error) {
            ToastMessage('An error occurred while submitting the form.');
        }

    }

    return (
        <div className='h-screen flex items-center'>
            <div className='absolute top-60 right-12'>
                <Cube height='300' width='300' />
            </div>
            <form onSubmit={(e) => { HandleNewPass(e) }} className="max-w-sm mx-auto w-96 bg-[#181E29] border-black p-10 rounded-lg shadow-2xl">
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">New Password</label>
                    <input type={showPass? 'text': 'password'} onChange={(e) => { setPassword(e.target.value) }} value={Password} id="password" className=" border outline-none  text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="********" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="ConfPassword" className="block mb-2 text-sm font-medium text-white">Confirm Password</label>
                    <input type={showPass? 'text': 'password'} onChange={(e) => { setConfirm_pass(e.target.value) }} value={confirm_pass} id="conf-password" className=" border outline-none  text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="********" required />
                </div>
                <div className='flex justify-between'>
                    <div className="flex items-start mb-5">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" onChange={()=>{setShowPass(!showPass)}}  value="" className="outline-none w-4 h-4 border rounded  focus:ring-3 bg-gray-700 border-gray-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800" />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium  text-gray-300">Show Password</label>
                    </div>
                </div>
                <Button text='Submit' />
            </form>
        </div>
    )
}

export default NewPass