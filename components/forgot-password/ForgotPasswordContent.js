
"use client";

import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import ToastMessage from '@/components/layout/ToastError';
import NewPass from './NewPass';

const ForgotPasswordContent = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [message, setMessage] = useState('');
    const [error, setError] = useState();

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
                    setError(false);
                } else {
                    setMessage(data.message);
                    setError(true);
                }
            } catch (error) {
                ToastMessage('An error occurred while submitting the form.');
            }
        };

        SendToken();
    }, [token]);

    return (
        <>
            {error ? (<div className="w-full flex-col flex items-center max-w-sm border rounded-lg shadow bg-gray-800 border-gray-700 h-80">
                <h1 className=' text-2xl font-bold my-4 word'>Linkly</h1>
                <h3 className='text-xl font-bold my-4 text-white text-center'>Token TimeOut You Have to Re Enter Your Email</h3>
                <p className='text-red-600 text-xl font-bold my-4'>{message}</p>
                <div className='my-4'><a href='/login' target='_blank' className='text-blue-600'>Go Back To Login Page</a></div>

            </div>) : <NewPass />}

        </>

    );
};

export default ForgotPasswordContent;
