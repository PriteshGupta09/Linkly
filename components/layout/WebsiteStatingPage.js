import React from 'react'
import Image from 'next/image'
import Loader from '../common/Loader'

const WebsiteStatingPage = () => {
    return (
        <div className='h-screen flex justify-center text-white p-20 pt-28'>
            <div>
                <div className='flex justify-center'>
                    <Image src='/Linkly.png' alt='Logo' height={120} width={120}/>
                </div>
                <div className='text-center text-3xl font-bold mb-4'>
                    <h1>Welcome To <span className='word'>Linkly</span></h1>
                </div>
                <div className='w-[75%] text-center mx-auto text-xl'>
                    <h3>Wait a Movement, We are Setup Things To make Your Experience Smooth.</h3>
                </div>
                <div className='my-8 flex justify-center '>
                    <Loader />
                </div>
            </div>
        </div>
    )
}

export default WebsiteStatingPage
