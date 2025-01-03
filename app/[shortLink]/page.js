'use client'
import React, {useContext, useState, useEffect} from 'react'
import { useParams, useRouter } from 'next/navigation'
import ToastMessage from '@/components/layout/ToastError'
import { fetchDataFromLocalStorage } from '@/utils/localstorage-oper'
import { updateCount } from '@/utils/localstorage-oper'
import ProfileContext from '../context/ProfileContext'
import Loader from '@/components/common/Loader'

const Page = () => {
    const router = useRouter()
    const ShortLink = useParams().shortLink
    const {updateProfile} = useContext(ProfileContext)
    const [loader, setLoader] = useState(true)

    useEffect(() => {

      const data =  fetchDataFromLocalStorage()

      const URL = `${process.env.NEXT_PUBLIC_HOST}/${ShortLink}`

      const isShortLink = data.find((posts)=>posts.ShortLink == URL)

      const OriginalLink = isShortLink?.OriginalLink

      if(isShortLink){
        setLoader(false)
        updateCount(URL)
        router.replace(OriginalLink)
        return
      }

        async function SendDataToPost() {
                try {
                  const response = await fetch("/api/link/shortlink", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ShortLink}),
                  });
            
                  const data = await response.json();
            
                  if (response.ok) {
                    updateProfile()
                    setLoader(false)
                    router.replace(data.message)
                  } else {
                    setLoader(false)
                    router.replace('/')
                    ToastMessage(data.message)
                  }
                } catch (error) {
                  setLoader(false)
                }
        }
        SendDataToPost()
    }, [])
    
  return (<>
    {loader ? (
      <div className='relative h-screen w-screen bg-black/40 z-[999]'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <Loader />
        </div>
      </div>
      ) : ''}
    <ToastMessage />

  </>)
}

export default Page
