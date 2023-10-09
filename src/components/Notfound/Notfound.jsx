import React from 'react'
import logo from '../../assets/error.svg'
export default function Notfound() {
  return (
    <div>
      <div className='text-center w-50 mx-auto my-3'>
        <p className='fs-1 my-3'>Page Not Found</p>
        <img src={logo} alt='Page not found' className='my-3'/>
      </div>
    </div>
  )
}
