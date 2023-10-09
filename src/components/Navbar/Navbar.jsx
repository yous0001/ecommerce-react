import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import freshcart from '../../assets/freshcart-logo.svg'
import { useFormik } from 'formik'
import { UserToken } from '../../contex/UserToken'
import { Cartcontext } from '../../contex/Cartcontext'

export default function Navbar() {
  let {isLogin,setIsLogin} = useContext(UserToken);
  let {cartnums}=useContext(Cartcontext)
  let navigate =useNavigate()
  function signout(){
    localStorage.removeItem("token")
    setIsLogin(null)
    navigate("/")
  }
  
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={freshcart} alt='freshcart'/>
            </Link>
          <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {isLogin?<ul className="navbar-nav mx-auto text-center mt-2 mt-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Home</NavLink>
              </li><li className="nav-item">
                <NavLink className="nav-link"to="/products" >products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">cart</NavLink>
              </li>
              <li className="nav-item">
              <NavLink className="nav-link" to='/brands'>Brands</NavLink>
            </li>
              
              <li className="nav-item">
                <NavLink className="nav-link" to="categories">categories</NavLink>
              </li>

            </ul>:""}
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              {!isLogin?<><li className="nav-item">
                <NavLink className="nav-link" to="register">Register</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="login">Login</NavLink>
              </li></>:<>
              <li className="nav-item position-relative">
                <Link className="nav-link cursor-pointer" to={'/cart'}><i className='fa-solid fa-cart-shopping fs-2'></i>
                <span className='position-absolute top-0 end-0 p-1 rounded-2 bg-main text-white'>{cartnums}</span>
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-link cursor-pointer" onClick={signout}>log out</span>
              </li>
              </>}
              


            </ul>
          </div>
        </div>
      </nav>
      
    </>
  )
}
