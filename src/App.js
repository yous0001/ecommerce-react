import React, { useContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home.jsx'
import Products from './components/Products/Products'
import Categories from './components/Categories/Categories'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login'
import Register from './components/register/Register'
import Notfound from './components/Notfound/Notfound'
import { UserToken } from './contex/UserToken'
import Protected from './components/Protected'
import Productdetails from './components/Productdetails'
import Brands from './components/Brands/Brands'
import { Toaster } from 'react-hot-toast';

export default function App() {
  let {setIsLogin}=useContext(UserToken);
  useEffect(()=>{
    if(localStorage.getItem("token")){
    setIsLogin(localStorage.getItem("token"))
  }
  },[])

  const routes=createBrowserRouter([
    {
      path:"/", element:<Layout></Layout>,children:[
        {index:true ,element:<Protected><Home></Home></Protected>},
        {path:"products",element:<Protected><Products></Products></Protected>},
        {path:"categories",element:<Protected><Categories></Categories></Protected>},
        {path:"cart",element:<Protected><Cart></Cart></Protected>},
        {path:"brands",element:<Protected><Brands></Brands></Protected>},
        {path:"productdetails/:id",element:<Productdetails></Productdetails>},
        {path:"login",element:<Login></Login>},
        {path:"register",element:<Register></Register>},
        {path:"*",element:<Notfound></Notfound>}
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster></Toaster>
    </div>
  )
}
