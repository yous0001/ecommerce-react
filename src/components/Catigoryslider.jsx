import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function Catigoryslider() {
  const BaseUrl = "https://ecommerce.routemisr.com";

  function getdata() {
    return axios.get(`${BaseUrl}/api/v1/categories`);
  }
  const { data, isLoading, isFetching } = useQuery("productdetails", getdata);
  var settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 5
  };
  return (
    <Slider {...settings}>
      {data?.data.data.map((catigory) => <div key={catigory._id} className="category">
        <img src={catigory.image} height={250} className="w-100 object-fit-cover"/>
        <h4 className="fw-bolder">{catigory.name}</h4>
        </div>
          
      )}
    </Slider>
  );
}
