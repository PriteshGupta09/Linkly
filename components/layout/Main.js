
import React from 'react'
import Link from 'next/link'
import TableCompo from './TableCompo'
import LinkData from '../main/LinkData'

const Main = () => {

    return (
        
        <div className='text-white pt-20 px-20 flex justify-center'>
            <div>
                <div>
                    <h1 className='word text-3xl font-bold text-center'>Shorten Your Loooong Links :)</h1>
                </div>
                <div className='my-4 w-[56%] mx-auto'>
                    <p className='text-center'>Linkly is an efficient and easy-to-use URL shortening service that streamlines your online appearance</p>
                </div>
                <LinkData />
                <div className='my-4'>
                    <p className='text-center'>You can create <span className='text-pink-500'>05</span> more links <Link href='/register' className='hover_effect'>`Register`</Link> now to enjoy unlimited usage</p>
                </div>
                <div className='w-[85vw]'>
                    <TableCompo />
                </div>
            </div>
        </div>
    )
}

export default Main
