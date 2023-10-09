import axios from "axios";
import { createContext, useContext, useState } from "react";
import { UserToken } from "./UserToken";


export let Cartcontext=createContext(0);

export default function CartContextProvider({children}){
    let [cartnums,setcartnums]=useState(0)
    let {isLogin}=useContext(UserToken);
    let headers={token:isLogin}
    const BaseUrl = "https://ecommerce.routemisr.com";
    function addcart(productId){
       return axios.post(`${BaseUrl}/api/v1/cart`,{productId},{headers}).then(res=>res).catch(err=>err)
    }
    function getcart(){
       return axios.get(`${BaseUrl}/api/v1/cart`,{headers}).then(res=>res).catch(err=>err)
    }
    function deletecart(id){
       return axios.delete(`${BaseUrl}/api/v1/cart/${id}`,{headers}).then(res=>res).catch(err=>err)
    }
    function updatecart(id,count){
       return axios.put(`${BaseUrl}/api/v1/cart/${id}`,{count},{headers}).then(res=>res).catch(err=>err)
    }
    
    return  <Cartcontext.Provider value={{addcart,getcart,deletecart,updatecart,cartnums,setcartnums}}>
        {children}
        </Cartcontext.Provider>
}