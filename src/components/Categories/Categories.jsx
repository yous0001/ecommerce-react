import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

export default function Categories() {
  const BaseUrl = "https://ecommerce.routemisr.com";
   let [Categories, setCategories] = useState(null);

    async function getCategories() {
    let { data } = await axios.get(`${BaseUrl}/api/v1/categories`);
    setCategories(data.data);
    console.log(data.data)
  }
  useEffect(()=>{
    getCategories()
  },[])
  return (
    <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Categories component</title>
            </Helmet>
            <div className="container">
              <div className="row g-3">
                {Categories?.map((category)=><div className="col-md-4">
                  <div className="product rounded p-3" style={{border:"1px solid gray"}}>
                    <img src={category.image} className='w-100 object-fit-cover'height={300}/>
                    <h3 className='text-main fw-bold text-center'>{category.name}</h3>
                  </div>
                  
                </div>
                  
                )}
              </div>
            </div>
            

</div>
  )
}
