import React from 'react'
import FetcheredProducts from '../FetcheredProducts'
import Catigoryslider from '../Catigoryslider'
import Mainslider from '../Mainslider'
import { Helmet } from 'react-helmet'

export default function Home() {
  return (
    <div className='overflow-hidden'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home component</title>
            </Helmet>
      <Mainslider></Mainslider>
      <Catigoryslider></Catigoryslider>
      <FetcheredProducts></FetcheredProducts>
    </div>
  )
}
