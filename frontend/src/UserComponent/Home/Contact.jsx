import React, { useState } from 'react'
import { IoMdCall } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import { FaLocationPin } from "react-icons/fa6";
import '../../Css/Contact.css';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { postcontactapi } from '../../Apis/Apirouter';

const Contact = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [description,setDescription] = useState("");

    const MakeValidation = () =>{
        if(name === "" || email === "" || description === ""){
            toast.error("Please fill all the forms");
            return false;
        }
        return true;
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!MakeValidation())return false;
        try{
            const formData = new FormData();
            formData.append('name',name);
            formData.append('email',email);
            formData.append('description',description);
            // console.log(formData);
            const response = await toast.promise(
                axios.post(postcontactapi,formData,{
                    withCredentials : true,
                    headers : {
                        "Content-Type" : "multipart/form-data"
                    }
                }),
                {
                    pending : "Processing",
                    error : "Something went wrong"
                }
            )
            if(response && response.data.success){
                toast.success("Successfully Contacted Admin");
                setName("");
                setEmail("");
                setDescription("");
                return true;
            }else return false;
        }catch(error){
            console.log(error);
            return false;
        }
    }

  return (

    <div className = "bg-gray-100">
        <div className = "flex w-full min-h-screen justify-center items-center contact">
            <div className = "flex flex-col md:flex-row  md:justify-center md:space-x-10 md:space-y-0 space-y-6 bg-cyan-600 w-full max-w-5xl p-9 rounded-xl shadow-lg mb-5 mt-5">
                <div className = "flex flex-col space-y-5 justify-evenly">
                    <div>
                        <h1 className = "font-bold text-4xl tracking-wide">Contact Us</h1>
                        <p className = "pt-2 font-semibold">We may contact us here</p>
                    </div>
                    <div className = "flex flex-col space-y-6">
                        <div className="flex gap-2 items-center">
                            <IoMdCall className='text-teal-300 text-xl'/>
                            <span>+(91) 8777032255</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <IoMdMail className='text-teal-300 text-xl'/>
                            <span>mail2dipayanghosh@gmail.com</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <FaLocationPin className='text-teal-300 text-xl'/>
                            <span>kolkata,West Bengal</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className = "bg-white rounded-lg shadow-lg p-10 text-gray-600">
                        <form className = "flex flex-col space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label for="name" className = "text-sm font-semibold">Name </label>
                                <input type="text" 
                                placeholder = "Your Name" 
                                className = "ring-1 mt-2 ring-gray-300 w-full p-3 rounded-md outline-none focus:ring-2 focus:ring-teal-300"
                                value = {name} 
                                onChange ={(e)=>setName(e.target.value)}/
                                >
                            </div>
                            <div>
                                <label for="Email" className = "text-sm font-semibold">Email </label>
                                <input type="text" 
                                placeholder = "Your Email" 
                                className = "ring-1 mt-2 ring-gray-300 w-full p-3 rounded-md outline-none focus:ring-2 focus:ring-teal-300"
                                value = {email}
                                onChange ={(e)=>setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label for ="description" className = "text-sm font-semibold">Description</label>
                                <textarea type = "text" 
                                placeholder = "Your Description" 
                                rows = "5"
                                className = "mt-2 ring-1 ring-gray-300 w-full p-3 rounded-md  outline-none focus:ring-2 focus:ring-teal-300"
                                value = {description}
                                onChange ={(e)=>setDescription(e.target.value)}
                                />
                            </div>
                            <button className = "self-end bg-cyan-700 font-bold rounded-lg px-4 py-2 text-white">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    </div>
  )
}

export default Contact