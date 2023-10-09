import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

export default function Brands() {
  const BaseUrl = "https://ecommerce.routemisr.com";
   let [brands, setbrands] = useState(null);

    async function getBrands() {
    let { data } = await axios.get(`${BaseUrl}/api/v1/brands`);
    setbrands(data.data);
    console.log(data.data)
  }
  useEffect(()=>{
    getBrands()
  },[])
  return (
    <div>
              <Helmet>
                <meta charSet="utf-8" />
                <title>Brands component</title>
            </Helmet>
            <div className="container">
              <h1 className='text-main text-center fw-bold my-5'>All Brands</h1>
              <div className="row g-3">
                {brands?.map((brand)=><div className="col-md-3">
                  <div className="product rounded p-3" style={{border:"1px solid gray"}}>
                    <img src={brand.image} className='w-100 object-fit-cover'height={200}/>
                    <h3 className='text-main fw-bold text-center'>{brand.name}</h3>
                  </div>
                  
                </div>
                  
                )}
              </div>
            </div>


        </div>
  )
}
