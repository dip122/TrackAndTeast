import React, { useState } from 'react'
import { resetpasswordapi } from '../../Apis/Apirouter';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
    const [password ,setpassword] = useState("");
    const [confirmpassword,setconfirmpassword] = useState("");
    const {token} = useParams();


    const MakeValidation = ()=>{
        if(password === "" || confirmpassword === ""){
            toast.error("Password Not Defined");
            return false;
        }else if(password !== confirmpassword){
            toast.error("Password donot match");
            return false;
        }
        return true;
    }


    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!MakeValidation())return true;
        try{
            const url = resetpasswordapi + token;
            const formData = new FormData();
            formData.append('password',password);
            const response = await toast.promise(
                axios.post(url, formData, {
                    withCredentials : true,
                    headers : {
                        "Content-Type" : "multipart/form-data"
                    }
                }),{
                    pending : "ResetProcessing...",
                    error : "Something went wrong"
                }
            );
            if(response && response.data.success){
                toast.success("ResetPassword Successful");

            }else{
                toast.error("Password reset not possible");
            }
        }catch(error){
            console.log(error);
            // status('fail');
            toast.error("Server side error");
            return false;
        }
    }

  return (
    <div className= "flex flex-col min-h-dvh justify-center items-center min-h-screen bg-neutral-200 p-8 w-full space-y-8">
        <div className = "text-3xl font-extrabold text-gray-800">ForgetPassword</div>
            <form className = "mt-8 space-y-6 w-80" onSubmit={handleSubmit}>
                <div className = "rounded-md space-y-3">
                    <input
                    type = "text"
                    placeholder = "Enter Your Password"
                    className = "apperence-none realtive block w-full p-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value ={password}
                    onChange={(e)=>setpassword(e.target.value)}
                    />
                    <input
                    type = "text"
                    placeholder = "Confirm Your Password"
                    className = "apperence-none realtive block w-full p-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value ={confirmpassword}
                    onChange={(e)=>setconfirmpassword(e.target.value)}
                    />
                </div>
                <div className = "flex justify-center items-center">
                    <button type = "submit" className = "w-3/5 rounded-lg py-3 px-4 text-white font-semibold border border-transparent bg-gradient-to-r from-indigo-600 to-blue-500 focus:outline-none transition-all duration-300">Continue</button>
                </div>
            </form>
            <ToastContainer/>
    </div>
  )
}

export default ResetPassword