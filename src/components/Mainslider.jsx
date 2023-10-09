import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import slide1 from '../assets/bag.jpg'
import slide2 from '../assets/ring.jpg'
import img1 from '../assets/bags.jpg'
import img2 from '../assets/guittar.jpg'

export default function Mainslider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return (
    <div className="container mb-5 w-50">
        <div className="row">
        <div className="col-md-6">
        <Slider {...settings}>
            <img src={slide1} className="w-100"/>
            <img src={slide2} className="w-100"/>
        </Slider>
            
            
            
        </div>
        <div className="col-md-6 d-flex flex-column">
            <img src={img1} className="w-100"/>
            <img src={img2} className="w-100"/>
        </div>
        </div>
    </div>
  )
}
