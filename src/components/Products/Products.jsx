import React from 'react'
import FetcheredProducts from '../FetcheredProducts'
import { Helmet } from 'react-helmet'

export default function Products() {
  return (
    <div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>products component</title>
            </Helmet>
            <FetcheredProducts></FetcheredProducts>
      </div>
  )
}
