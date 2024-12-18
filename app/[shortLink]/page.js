'use client'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect} from 'react'
import ToastMessage from '@/components/layout/ToastError'

const Page = () => {
    const router = useRouter()
    const ShortLink = useParams().shortLink

    useEffect(() => {
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
    }, [])
    

  return (<>
  
    <ToastMessage />

  </>)
}

export default Page
