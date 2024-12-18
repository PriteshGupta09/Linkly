'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ToastMessage from '@/components/layout/ToastError';

const Verify = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [message, setMessage] = useState('')
    const [error, setError] = useState()
    const [status, setStatus] = useState('')

    useEffect(() => {
        const SendToken = async () => {
            try {
                const response = await fetch("/api/user/verify-handler", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(token),
                });

                const data = await response.json();

                if (response.ok) {
                    setMessage(data.message)
                    setError(false)
                    setStatus('Verify')
                } else {
                    setMessage(data.message)
                    setError(true)
                    setStatus('Not Verify')
                }
            } catch (error) {
                ToastMessage('An error while submitting form.')
            }
        }
        SendToken()
    }, [token])

    return (
        <div className="w-full max-w-sm  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-80">
            <ToastMessage />
            <div className="flex flex-col items-center pb-10 relative">
                <div className='absolute bg-blue-200/30 -top-11 visible w-[100px] h-[100px] mb-3 rounded-full shadow-lg'></div>
                {error ?
                <svg
                    className={` absolute -top-12 w-24 h-24 mb-3 rounded-full shadow-lg flex justify-center items-center`}
                    width="100%"
                    height="100%"
                    viewBox="1500 500 850 1200"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="100%" height="100%" fill="#0B101B" />
                    <g clipPath="url(#clip)">
                        <g transform="matrix(22.05,0,0,22.05,2019.84,1169.85)" opacity="1">
                            <g opacity="1" transform="matrix(1,0,0,1,-4.53,-4.08)">
                                <path
                                    fill="rgb(249,65,91)"
                                    fillOpacity="1"
                                    d="M0,-28.53C15.74,-28.53,28.53,-15.74,28.53,0C28.53,15.74,15.74,28.53,0,28.53C-15.74,28.53,-28.53,15.74,-28.53,0C-28.53,-15.74,-15.74,-28.53,0,-28.53z"
                                />
                            </g>
                        </g>
                        <g transform="matrix(0.98434,0,0,0.98434,1903.05,1051.38)" opacity="1" style={{ display: 'block' }}>
                            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                <path
                                    strokeLinecap="butt"
                                    strokeLinejoin="miter"
                                    fillOpacity="0"
                                    strokeMiterlimit="4"
                                    stroke="rgb(255,255,255)"
                                    strokeOpacity="1"
                                    strokeWidth="138"
                                    d="M248.81,295.41C248.81,295.41-212.2,-237.24-212.2,-237.24M-223.19,290.59C-223.19,290.59,276.36,-232.43,276.36,-232.43"
                                />
                            </g>
                        </g>
                    </g>
                </svg> : <svg className="absolute -top-12 w-24 h-24 mb-3 rounded-full shadow-lg flex justify-center items-center" width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" fill="#0B101B" />
                    <path d="M20 6L9 17L4 12" stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                }

                <div className='my-20'>
                    <h2 className='font-bold text-white w-fit mx-auto text-2xl mb-6'>{status}</h2>
                    <p className='text-center text-white font-semibold px-5 mb-6'>{message}</p>
                   <a href={`${process.env.NEXT_PUBLIC_HOST}/login`} target='_blank' className=' text-white flex items-center trans-right-arrow w-fit mx-auto'>Go Back To Website <span> <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#5f6368"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" /></svg> </span></a>
                </div>
            </div>
        </div>
    )
}

export default Verify
