import React, { useContext, useEffect, useState } from "react";
import { Cartcontext } from "../../contex/Cartcontext";
import { UserToken } from "../../contex/UserToken";

export default function Cart() {
  let { getcart ,deletecart,updatecart,setcartnums} = useContext(Cartcontext);
  let { isLogin } = useContext(UserToken);
  let [data, setdata] = useState(null);

  async function getcartfunc() {
    let result = await getcart();
    setdata(result.data);
    setcartnums(result.data.numOfCartItems);
  }
  async function deletecartfunc(id) {
    let result = await deletecart(id);
    console.log(result.data.status)
    if(result.data.status==='success'){
      getcartfunc()
    }
  }
  async function updatecartfunc(id,count) {
    let result = await updatecart(id,count);
    console.log(result.data.state)
    if(result.data.status==='success'){
      getcartfunc()
    }
  }

  useEffect(() => {
    if (!isLogin) return;

    getcartfunc();
  }, [isLogin]);
  return (
    <div className="container my-3" style={{backgroundColor:"#F8F9FA"}}>
      <div className="cartbox p-3">
        <h2 className="my-2">cart Shop</h2>
        <h3>
          total price:
          <span className="text-main fw-bold">{data?.data.totalCartPrice}</span>
        </h3>
        {data?.data.products.map((product) => (
          <div key={product.product._id} className="row my-3">
            <div className="col-md-9">
              <div className="row align-items-center">
                <div className="col-md-3">
                  <img src={product.product.imageCover} className="w-100" />
                </div>
                <div className="col-md-9 fw-bold">
                  <p>{product.product.title}</p>
                  <p>{product.price} EGP</p>
                  <p className="text-danger cursor-pointer" onClick={()=>{deletecartfunc(product.product._id)}} ><i className="fa-solid fa-trash"></i>Remove</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 d-flex align-items-center">
              <button className="btn btn-outline-success" onClick={()=>{updatecartfunc(product.product._id,++product.count)}}>+</button>
              <span className="mx-3">{product.count}</span>
              <button className="btn btn-outline-success" onClick={()=>{updatecartfunc(product.product._id,--product.count)}}>-</button>
            </div>
          </div>
        ))}
        <button className="btn">Clear Your Null</button>
      </div>
    </div>
  );
}
