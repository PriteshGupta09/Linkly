'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import TableCompo from './TableCompo'
import LinkData from '../main/LinkData'

const Main = () => {
    const [paste, setPaste] = useState(false)
    return (
        <div className='text-white pt-40 px-20 flex justify-center'>
            <div>
                <div>
                    <h1 className='word text-3xl font-bold text-center'>Shorten Your Loooong Links :)</h1>
                </div>
                <div className='my-4 w-[56%] mx-auto'>
                    <p className='text-center'>Linkly is an efficient and easy-to-use URL shortening service that streamlines your online appearance</p>
                </div>
                <LinkData />
                <div className='my-4 mx-auto w-[56%] flex items-center justify-center'>
                    <div className='flex items-center gap-3'>
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" onClick={()=>{setPaste(!paste)}} className="sr-only peer" />
                                <div className="relative w-11 h-6 peer-focus:outline-none rounded-full peer bg-[#181E29] peer-checked:after:border-none peer-checked:after:translate-x-full peer-checked:after:bg-blue-700 rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#181E29]"></div>
                        </label>
                        <span className='text-base'>Auto Paste from Clipboard.</span>
                    </div> 
                </div>
                <div className='my-4'>
                    <p className='text-center'>You can create <span className='text-pink-500'>05</span> more links. <Link href='/register' className='hover_effect'>`Register`</Link> now to enjoy unlimited usage</p>
                </div>
                <div className='w-[85vw]'>
                    <TableCompo />
                </div>
            </div>
        </div>
    )
}

export default Main
