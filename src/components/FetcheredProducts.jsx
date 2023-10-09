import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import Productdetails from "./Productdetails";
import { Cartcontext } from "../contex/Cartcontext";
import toast from "react-hot-toast";



export default function FetcheredProducts() {
//   let [products, setProducts] = useState([]);
//   let [loading, setloading] = useState(false);
  const BaseUrl = "https://ecommerce.routemisr.com";
  let {addcart,setcartnums} = useContext(Cartcontext);

  async function addcartfunc(id){
    let result=await addcart(id);
    setcartnums(result.data.numOfCartItems);
    toast.success(result.data.message,{
      position:'top-right',
      style:{backgroundColor:'#0aad0a',color:'white'}
    })
  }
//   async function getProducts() {
//     setloading(true);
//     let { data } = await axios.get(`${BaseUrl}/api/v1/products`);
//     setProducts(data.data);
//     setloading(false);
//     console.log(products);
//   }

//   useEffect(() => {
//     getProducts();
//   }, []);


function getdata (){
    return axios.get(`${BaseUrl}/api/v1/products`)
}
    const {data,isLoading,isError,isFetching} =useQuery('products',getdata)
    
  return (
    <div className="contaniner mt-4 mx-auto" style={{width:"85%"}}>
      <div className="row">
        {isLoading ? (
          <h2 className="text-center fs-1">
            <i className="fa-solid fa-spin fa-spinner text-secondary"></i>
          </h2>
        ) :  data.data.data.map((product) => <div className="col-lg-3 col-md-6" key={product._id}>
              <div className="product p-3 rounded-2">
                <Link to={`/productdetails/${product._id}`}>
                <img src={product.imageCover} className="w-100" alt="productimg"/>
                <p className="text-main">{product.category.name}</p>
                <p>{product.title.split(" ").slice(0,2).join(" ")}</p>
                <div className="product-box d-flex justify-content-between">
                    <span>{product.price} EGP</span>
                    <span><i className="fa-solid fa-star rating-color"></i>{product.ratingsAverage}</span>
                </div>
                </Link>
                <button className="btn form-btn my-2 text-light my-auto w-75" onClick={()=>{addcartfunc(product._id)}}>Add +</button>
              </div>
            </div>
            )
          }
      </div>
    </div>
  );
}
