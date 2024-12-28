'use client'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect} from 'react'
import ToastMessage from '@/components/layout/ToastError'
import { fetchDataFromLocalStorage } from '@/components/layout/TableCompo'
import { updateCount } from '@/components/layout/TableCompo'

const Page = () => {
    const router = useRouter()
    const ShortLink = useParams().shortLink
    
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
                    body: JSON.stringify(ShortLink),
                  });
            
                  const data = await response.json();
            
                  if (response.ok) {
                    router.replace(data.message)
                  } else {
                    ToastMessage(data.message)
                  }
                } catch (error) {
                  ToastMessage('An error while submitting form.')
                }
        }
        SendDataToPost()
    }, [ShortLink])
    

  return (<>
  
    <ToastMessage />

  </>)
}

export default Page
