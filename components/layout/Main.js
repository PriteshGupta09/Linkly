'use client'
import React, { useState, useEffect, useContext} from 'react'
import Link from 'next/link'
import TableCompo from './TableCompo'
import LinkData from '../main/LinkData'
import { fetchDataFromLocalStorage } from '@/utils/localstorage-oper'
import Loader from '../common/Loader'
import ProfileContext from '@/app/context/ProfileContext'

const Main = ({overflowhide}) => {
    // const [paste, setPaste] = useState(false)

    const {profile} = useContext(ProfileContext)

    const [loadDatafromLocal, setLoadDatafromLocal] = useState()
    const [datafromls, setDatafromls] = useState('')
    const [loading, setLoading] = useState(false)

    function DataFromLinkCompo(click) {
        setLoadDatafromLocal(click)
        setTimeout(() => {
            setLoadDatafromLocal(false)
        }, 1000);
    }

    useEffect(() => {
        const data = fetchDataFromLocalStorage()
        setDatafromls(data)

    }, [loadDatafromLocal])

    function loader(load) {
        setLoading(load)
    }


    return (
        <>
            {loading ? (
                <div className='absolute h-screen w-screen bg-black/40 z-[999]'>
                    <div className='absolute inset-0 bg-black/40 z-[999] flex items-center justify-center'>
                        <Loader />
                    </div>
                </div>
            ) : null}
            <div className='flex items-center justify-center'>
                <div className='text-white pt-40 px-20 flex justify-center'>
                    <div>
                        <div>
                            <h1 className='word text-3xl font-bold text-center'>Shorten Your Loooong Links :)</h1>
                        </div>
                        <div className='my-4 w-[56%] mx-auto'>
                            <p className='text-center'>Linkly is an efficient and easy-to-use URL shortening service that streamlines your online appearance</p>
                        </div>
                        <LinkData DataFromLinkCompo={DataFromLinkCompo} loader={loader} overflowhide={overflowhide} />
                        {/* <div className='my-4 mx-auto w-[56%] flex items-center justify-center'>
                            <div className='flex items-center gap-3'>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" onClick={() => { setPaste(!paste) }} className="sr-only peer" />
                                    <div className="relative w-11 h-6 peer-focus:outline-none rounded-full peer bg-[#181E29] peer-checked:after:border-none peer-checked:after:translate-x-full peer-checked:after:bg-blue-700 rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#181E29]"></div>
                                </label>
                                <span className='text-base'>Auto Paste from Clipboard.</span>
                            </div>
                        </div> */}
                        <div className='my-4'>
                            {profile?<p className='text-center'>Thanks for becoming the part of Linkly, Now you can enjoy <span className='text-pink-500'>Unlimited</span> Usage for Lifetime.</p>:<p className='text-center'>You can create <span className='text-pink-500'>{5 - datafromls.length}</span> more links. <Link href='/register' className='hover_effect'>`Register`</Link> now to enjoy unlimited usage</p>}
                        </div>
                        <div className='w-[85vw]'>
                            <TableCompo DataFromLinkCompo={DataFromLinkCompo} loadDatafromLocal={loadDatafromLocal} loader={loader} overflowhide={overflowhide} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main
