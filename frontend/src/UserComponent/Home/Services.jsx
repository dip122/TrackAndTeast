import React from 'react'
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import '../../Css/Services.css'

const Services = () => {
  return (
    <div className = "w-full min-h-screen services">
        <div className = "flex flex-col items-center container">
            <div className = "p-2 font-semibold mt-5 header">Services</div>
            <div className = "flex flex-row gap-5 banner">
                <div className = "banner p-8 flex flex-col text-center items-center min-h-80 ring-1 ring-gray-400 card">
                    <FaUserPlus/>
                    <div className = "mt-3 firstp">Create Account</div>
                    <div className = "mt-5 secondp">First create Your Account then Look For Your speicy food.Here you can
                        see Your favourite foods and pay and order them</div>
                </div>
                <div className = "banner p-8 flex flex-col text-center items-center min-h-80 ring-1 ring-gray-400 card">
                    <MdFindInPage/>
                    <div className = "mt-3 firstp">Order Your Food</div>
                    <div className = "mt-5 secondp">First create Your Account then Order Your Food.Here you can order 
                    and you should have online payment system to deal with this app</div>
                </div>
                <div className = "banner p-8 flex flex-col text-center items-center min-h-80 ring-1 ring-gray-400 card">
                    <IoMdSend/>
                    <div className = "mt-3 firstp">Track Your Food</div>
                    <div className = "mt-5 secondp">You can Track Your Food prepartion and can check current status of Food.
                    Your can see weather your food is out for delivery or being ready</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Services