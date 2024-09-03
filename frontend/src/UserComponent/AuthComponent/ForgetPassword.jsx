import React, { useState } from 'react'
import axios from 'axios';
import { forgetpasswordapi } from '../../Apis/Apirouter';

const ForgetPassword = () => {
    
    const [email,setEmail] = useState("");
    const [status , setstatus] = useState('');
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }
    

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!validateEmail(email)){
            setstatus('email');
            return false;
        }
        try{
            console.log(email);
            const formData = new FormData();
            formData.append('email',email);
            const response = await axios.post(forgetpasswordapi , formData , {
                withCredentials : true,
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            });
            if(response && response.data.success){
                setstatus('success');
                return true;
            }else{
                setstatus('fail');
                return false;
            }
        }catch(error){
            setstatus('fail');
            console.log(error);
            return false;
        }
    }

    
  return (
    <div className= "flex flex-col min-h-dvh justify-center items-center min-h-screen bg-neutral-200 p-8 w-full space-y-8">
        <div className = "text-3xl font-extrabold text-gray-800">ForgetPassword</div>
            <form className = "mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className = "rounded-md space-y-3">
                    <label htmlFor="email" className = "sr-only">Email Address</label>
                    <input
                     id = "email"
                     name = "email"
                     type = "email"
                     placeholder = "Enter Your Email"
                     className = "apperence-none realtive block w-full p-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                     value ={email}
                     onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div className = "flex justify-center items-center">
                    <button type = "submit" className = "w-3/5 rounded-lg py-3 px-4 text-white font-semibold border border-transparent bg-gradient-to-r from-indigo-600 to-blue-500 focus:outline-none transition-all duration-300">Continue</button>
                </div>
                {status ==='fail' ? <div className = "text font-semibold">Something went wrong</div> : status === 'success' ? <div className = "text-center font-semibold">Email Sent</div> : status === 'email' ? <div className= "text">Provide Valid email</div> : status === 'wait' && <div className = "text-center font-semibold">wait...</div>}
            </form>
    </div>
  )
}

export default ForgetPassword