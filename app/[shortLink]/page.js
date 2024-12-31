'use client'
import React, {useContext} from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect} from 'react'
import ToastMessage from '@/components/layout/ToastError'
import { fetchDataFromLocalStorage } from '@/utils/localstorage-oper'
import { updateCount } from '@/utils/localstorage-oper'
import ProfileContext from '../context/ProfileContext'

const Page = () => {
    const router = useRouter()
    const ShortLink = useParams().shortLink
    const {updateProfile} = useContext(ProfileContext)
    
    useEffect(() => {

      const data =  fetchDataFromLocalStorage()

      const URL = `${process.env.NEXT_PUBLIC_HOST}/${ShortLink}`
      console.log(URL)
      const isShortLink = data.find((posts)=>posts.ShortLink == URL)
      const OriginalLink = isShortLink?.OriginalLink
      if(isShortLink){
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
                    router.replace(data.message)
                  } else {
                    ToastMessage(data.message)
                  }
                } catch (error) {
                  ToastMessage('An error while submitting form.')
                }
        }
        SendDataToPost()
    }, [])
    

  return (<>
  
    <ToastMessage />

  </>)
}

export default Page
