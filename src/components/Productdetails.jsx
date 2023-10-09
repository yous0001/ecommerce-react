import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Cartcontext } from '../contex/Cartcontext';
import toast from 'react-hot-toast';

export default function Productdetails() {
    const BaseUrl = "https://ecommerce.routemisr.com";
    let {id} =useParams()


    let {addcart,setcartnums} = useContext(Cartcontext);
  
    async function addcartfunc(id){
      let result=await addcart(id);
      setcartnums(result.data.numOfCartItems);
      toast.success(result.data.message,{
        position:'top-right',
        style:{backgroundColor:'#0aad0a',color:'white'}
      })
    }

    function getdata (){
        return axios.get(`${BaseUrl}/api/v1/products/${id}`)
    }
        const {data,isLoading} =useQuery('productdetails',getdata)
        

if(isLoading){
    return <div className="flex align-items-center justify-content-center">
     <h2 className="text-center top-50 start-50 position-fixed fs-1">
    <i className="fa-solid fa-spin fa-spinner text-secondary"></i>
  </h2>
  </div>
}
return (
    <div className='container '>
        <div className="row align-items-center">
            <div className="col-md-4">
                <img src={data?.data.data.imageCover} className='w-100' alt='productimage'/>
            </div>
            <div className="col-md-8">
                <h2 className="fw-bolder">{data?.data.data.title}</h2>
                <p>{data?.data.data.description}</p>
                <div className="box d-flex justify-content-between">
                    <p>{data?.data.data.price} EGP</p>
                    <p><i className="fa-solid fa-star rating-color"></i>{data?.data.data.ratingsAverage}</p>
                </div>
                <div className="box2 d-flex">
                <button onClick={()=>{addcartfunc(data?.data.data._id)}} className='btn form-btn w-75 mx-auto d-block' >ADD +</button>
                <i className='fa-solid fa-heart h3'></i>
                </div>
            </div>
        </div>
    </div>
  )
}
