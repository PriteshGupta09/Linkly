import React from 'react'

function Button({text}) {
  return (
    <div>
      <button className='mx-4 bg-blue-600 text-white text-sm font-bold rounded-full px-5 py-3'>{text}</button>
    </div>
  )
}

export default Button
