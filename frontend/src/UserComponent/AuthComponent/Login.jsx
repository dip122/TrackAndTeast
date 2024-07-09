import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../../Css/auth.css'
import { loginapi } from '../../Apis/Apirouter';
import { useAuth } from '../../Context/Context';
import { useStorage } from '../../Context/StorageContext';

const Login = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  const [auth,setAuth] = useAuth();
  const {loadCartData} = useStorage();

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  const MakeValidation = ()=>{
 if(email === "" || !validateEmail(email)){
      toast.error("Please Enter an Email address");
      return false;
    }
    if(password === ""){
      toast.error("Please enter all fields");
      return false;
    }
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const formData = new FormData();
      formData.append('email',email);
      formData.append('password',password);
      const response = await toast.promise(
        axios.post(loginapi,formData, {
          withCredentials : true,
          headers : {
            "Content-Type": "multipart/form-data",
         }
        }),
        {
          pending : "Logining in....",
          error : "something went wrong",
        }
      );

      if(response && response.data.success){
        toast.success("successfully logged in")
        const user = response.data.user;
        const token = response.data.token;
        setAuth({
          ...auth,
          user : user,
          token : token
        })

        await localStorage.setItem('user-Data',JSON.stringify(response.data));
        await loadCartData();
        setTimeout(() => {
          if(user?.role === true)navigate('/adminDashboard')
          else if(user?.role === false)navigate('/');
        },2000);
      }else{
        toast.error(response.data.message);
      }
    }catch(error){
      console.log(error);
      return false;
    }
  }


  return (
    <div 
    className="min-h-screen py-20" 
    style={{ backgroundImage: 'linear-gradient(115deg, #593CC2, #8606AD)'}}
  >
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url('./images/background.jpeg')`}}>
          <div className="p-8 text-black text-center">
            <h1 className="text-4xl register-welcome">Welcome</h1>
            <p className="mt-4 register-desc">
            Explore a world of culinary delights with our food website, 
            where every click leads to mouthwatering discoveries. 
            From delectable recipes to restaurant reviews, 
            satisfy your cravings with just a taste
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 py-16 px-12">
          <h2 className="text-3xl mb-4 register-text">Login</h2>
          <p className="mb-4 register-account">Login Into Your Account</p>
          <form onSubmit ={handleSubmit}>
            <div className="mt-5">
              <input type="text" placeholder="Email" className="border border-gray-400 w-full p-2" value = {email} onChange ={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="mt-5">
              <input type="password" placeholder="Password" className="border border-gray-400 w-full p-2" value = {password} onChange = {(e)=>setPassword(e.target.value)} />
            </div>
            <div className = "mt-3 font-serif">
                Don't have an account ? <span className="text-blue-500 font-semibold"><Link to='/register'>Click Here!</Link></span>
            </div>
            <div className = "mt-3 font-serif">
                Forget Your Passowrd ? <span className="text-blue-500 font-semibold"><Link to='/forget-password'>Click Here!</Link></span>
            </div>
            <div className="mt-5">
              <button type = "submit" className="w-full bg-purple-500 py-3 text-center text-white font-semibold">Login</button>
            </div>
          </form>
        </div>
        <ToastContainer/>
      </div>
    </div>
  </div>
  )
}

export default Login