
"use client";

import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import ToastMessage from '@/components/layout/ToastError';
import NewPass from './NewPass';
import Loader from '../common/Loader';

const ForgotPasswordContent = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [message, setMessage] = useState('');
    const [error, setError] = useState();
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        const SendToken = async () => {
            try {
                const response = await fetch("/api/user/forgot-pass-verify-handler", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(token),
                });

                const data = await response.json();

                if (response.ok) {
                    setMessage(data.message);
                    setLoader(false)
                    setError(false);
                } else {
                    setMessage(data.message);
                    setLoader(false)
                    setError(true);
                }
            } catch (error) {
                setLoader(false)
                ToastMessage('Internal Server Error.');
            }
        };

        SendToken();
    }, [token]);

    return (
        <>
            {loader ? (
                <div className='relative h-screen w-screen bg-black/40 z-[999]'>
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <Loader />
                    </div>
                </div>
            ) : null}
            <div className='absolute'>
            {error ? (
                <div className="w-96 flex-col flex items-center max-w-sm border rounded-lg shadow bg-gray-800 border-gray-700 h-80">
                <h1 className=' text-2xl font-bold my-4 word'>Linkly</h1>
                <h3 className='text-xl font-bold my-4 text-white text-center'>Link is Expired or Invalid, You have to try again.</h3>
                <p className='text-red-600 text-xl font-bold my-4'>{message}</p>
                <div className='my-4'><a href='/login' target='_blank' className='text-blue-600'>Go Back To Login Page</a></div>
            </div>) : <NewPass />}
            </div>

        </>

    );
};

export default ForgotPasswordContent;
