'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from 'next/link'
import LoginButton from '../common/LoginButton'
import Button from '../common/Button'

const PopUp = () => {
  const [showPopUp, setShowPopUp] = useState(true)
  const array = ['Limited Usage for Lifetime', 'Create Your Own Custom Links', 'To Share Your Links With Others People']

  function handleClose() {
    setShowPopUp(false)
    sessionStorage.setItem('PopUp' , 'false')
  }

  return (
    <div className={`${showPopUp ? 'block': 'hidden'} absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 z-50 bg-gray-700 border-gray-500 border rounded-md shadow-lg p-10`}>
      <div>
        <button onClick={()=>{handleClose()}} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>
      <div>
        <h1 className='text-white text-2xl text-center font-bold'>
          New To <span className='word'>Linkly?</span>
        </h1>
      </div>
      <div className='my-4 text-white text-center'>
        <h3>Register or Login into Your Account To Enjoy:</h3>
      </div>
      <div>
        <ul>
          {array.map((data, key) =>
          (<div className='relative mb-4 w-fit hover-effect' key={key}>
            <li className='bg-gray-700 text-zinc-300'>{data}</li>
            <div className='absolute h-[2px] top-6 line'></div>
          </div>
          ))}
        </ul>
      </div>
      <div className='my-4 py-5 flex justify-between items-center'>
        <div onClick={()=>{handleClose()}}>
          <LoginButton />
        </div>
        <Link href='/register' onClick={()=>{handleClose()}}>
          <Button text="Register Now" />
        </Link>
      </div>
    </div>
  )
}

export default PopUp
