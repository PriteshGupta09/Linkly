'use client'
import React,{useState, useContext, useEffect} from 'react'
import Main from '@/components/layout/Main'
import PopUp from '@/components/layout/PopUp';
import ProfileContext from './context/ProfileContext';

const Home = () => {

  const {profile} = useContext(ProfileContext)
  const [showPopUp, setShowPopUp] = useState(false)

  useEffect(() => {
    const showpopupdata = sessionStorage.getItem('PopUp')
    if(!profile && !showpopupdata){
      setShowPopUp(true)
      sessionStorage.setItem('PopUp' , 'true')
    }
  }, [profile])
  

  return (
    <>
    {showPopUp ? <PopUp /> : ''}
    <Main />
    </>
  )
}

export default Home
