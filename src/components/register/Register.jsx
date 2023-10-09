import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CirclesWithBar } from "react-loader-spinner";

export default function Register() {
  let navigate = useNavigate();
  let [error, seterror] = useState("");
  let [loading, setloading] = useState(false);
  //string()=> this should be string
  //min(x,"")=>this should have min letters of x else this would print message "" (as same as max)
  //required("")=> this is required to submit else print ""
  //email("")=>this should be email
  //matches(/regular expretion/)=>check if this matches with the regular expretion
  //oneOf()=>this should be one of this passwords
  //ref()

  const YupSchema = Yup.object({
    name: Yup.string()
      .min(5, "min lenght is 5 chars")
      .max(10, "maximun chars is 10")
      .required("name is required"),
    email: Yup.string()
      .email("email is not valid")
      .required("email is required"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z][a-z0-9@]{5,10}$/,
        "password is not valid it should be 5 to 10 chars and starts with capital letter"
      ),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "this should be same as password")
      .required("repassword is required"), //this should be same as password
    phone: Yup.string()
      .matches(/^01[0-25][0-9]{8}$/, "phone is not valid")
      .required("phone is required"),
  });

  // function validation(values){
  //   let errors={}
  //   if(!values.name)
  //   errors.name='name is required to submit'
  //   else if(!/^[A-Z][a-z]{5,10}$/.test(values.name))
  //   errors.name="This name is unvalid please write aname of 5 to 10 letters and start with capital letter "

  //   if(!values.email)                                                                    //required
  //   errors.email='email is required to submit'
  //   else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))             //regular expression
  //   errors.email="This email is unvalid"

  // return errors
  // }
  let baseurl = "https://ecommerce.routemisr.com";
  async function submitRegitser(values) {
    setloading(true);
    let { data } = await axios
      .post(`${baseurl}/api/v1/auth/signup`, values)
      .catch((error) => {
        seterror(error.response.data.message);
        setloading(false);
      });
    if (data.message === "success") {
      seterror("");
      console.log("success");
      setloading(false);
      navigate("/login");
    }
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    }, //validate:validation//should be before onsubmit
    validationSchema: YupSchema,
    onSubmit: submitRegitser,
  });

  return (
    <>
      <div className="container my-3">
        <form className="w-75 m-auto" onSubmit={formik.handleSubmit}>
          <h2 className="my-4 fs-1">Register:</h2>
          {error ? <p className="alert alert-danger my-3">{error}</p> : ""}

          <label htmlFor="name">name:</label>
          <input
            type="text"
            id="name"
            className="form-control mb-3"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name ? (
            <p className="alert alert-danger">{formik.errors.name}</p>
          ) : (
            ""
          )}

          <label htmlFor="email">email:</label>
          <input
            type="email"
            id="email"
            className="form-control mb-3"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email ? (
            <p className="alert alert-danger">{formik.errors.email}</p>
          ) : (
            ""
          )}

          <label htmlFor="password">password:</label>
          <input
            type="password"
            id="password"
            className="form-control mb-3"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <p className="alert alert-danger">{formik.errors.password}</p>
          ) : (
            ""
          )}

          <label htmlFor="rePassword">rePassword:</label>
          <input
            type="password"
            id="rePassword"
            className="form-control mb-3"
            name="rePassword"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.rePassword}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <p className="alert alert-danger">{formik.errors.rePassword}</p>
          ) : (
            ""
          )}

          <label htmlFor="phone">phone:</label>
          <input
            type="tel"
            id="phone"
            className="form-control mb-3"
            name="phone"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <p className="alert alert-danger">{formik.errors.phone}</p>
          ) : (
            ""
          )}

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
              register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
