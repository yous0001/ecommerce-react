import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { CirclesWithBar } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { UserToken } from '../../contex/UserToken';

export default function Login() {
  let {setIsLogin} = useContext(UserToken);
  let navigate =useNavigate();
  let [error, seterror] = useState("");
  let [loading, setloading] = useState(false);

  const YupSchema=Yup.object({
    
    email:Yup.string().email("email is not valid").required("email is required"),
    password:Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}$/,"password is not valid it should be 5 to 10 chars and starts with capital letter"),

  })

  let baseurl = "https://ecommerce.routemisr.com";
  async function submitLogin(values){
    setloading(true);
    let { data } = await axios.post(`${baseurl}/api/v1/auth/signin`, values)
      .catch((error) => {
        seterror(error.response.data.message);
        setloading(false);
      });
    if (data.message === "success") {
      seterror("");
      console.log("success");
      setloading(false);
      setIsLogin(data.token);
      localStorage.setItem("token",data.token)
      navigate("/cart")
    }
  }

  let formik =useFormik({
    initialValues:{
      email:"",
      password:""

    }
    ,validationSchema:YupSchema,
    onSubmit:submitLogin
    
  })
  
  return (
    <>
    <div className="container my-3">
      <form className='w-75 m-auto' onSubmit={formik.handleSubmit}>
        <h2 className='my-4 fs-1'>Login:</h2>

        <label htmlFor='email'>email:</label>
        <input type="email" id='email' className='form-control mb-3' name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}/>
        {formik.errors.email && formik.touched.email?<p className="alert alert-danger">{formik.errors.email}</p>:""}

        <label htmlFor='password'>password:</label>
        <input type="password" id='password' className='form-control mb-3' name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}/>
        {formik.errors.password && formik.touched.password?<p className="alert alert-danger">{formik.errors.password}</p>:""}

        {loading ? (
            <button className="d-block ms-auto btn form-btn">
              <CirclesWithBar
                height="30"
                width="30"
                color="white"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                outerCircleColor=""
                innerCircleColor=""
                barColor=""
                ariaLabel="circles-with-bar-loading"
              />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              className="d-block ms-auto btn form-btn"
            >
              Login
            </button>
          )}
      </form>
    </div>
    </>
  )
}
