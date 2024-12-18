import React from 'react'
import { decryptData } from './encryptions'

export const localstorage = (data) => {
    const length = localStorage.length
    if(length == 5){
        console.log('Your Limit is reach You have to create a account now')
        return 
    }
    localStorage.setItem(length + 1, data)
}

