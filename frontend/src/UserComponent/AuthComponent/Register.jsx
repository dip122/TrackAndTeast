import React, { useState } from 'react'; // Ensure this path is correct
import { Link, useNavigate } from 'react-router-dom';
import '../../Css/auth.css'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { registerapi } from '../../Apis/Apirouter';
import axios from 'axios'

const Register = () => {

  const [firstname,setFirstname] = useState("");
  const [lastname,setLastname] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [phoneno,setPhoneno] = useState("");
  const [address,setAddress] = useState("");
  const navigate = useNavigate();

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  const MakeValidation = ()=>{
    if(firstname.length < 3 ){
      toast.error("FirstName Should be at least 3 charecters");
      return false;
    }
    if(lastname.length < 3){
      toast.error("LastName Should be at least 3 charecters");
      return false;
    }
    if(email === "" || !validateEmail(email)){
      toast.error("Please Enter an Email address");
      return false;
    }
    if(password === "" || confirmPassword === "" || address === "" || phoneno === ""){
      toast.error("Please enter all fields");
      return false;
    }
    if(password !== confirmPassword){
      toast.error("password donot match with confirmpassword");
      return false;
    }
    if(phoneno.length<10){
      toast.error("Contact No should be atleast of 10 charecters");
      return false;
    }
    return true;
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!MakeValidation())return false;
    try{
      const formData = new FormData();
      formData.append('firstname', firstname);
      formData.append('lastname',lastname);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phoneno',phoneno);
      formData.append('address',address);
      const response = await toast.promise(
        axios.post(registerapi,formData,{
          withCredentials: true,
          headers : {
            "Content-Type": "multipart/form-data",
          }
        }),
        {
          pending : "Registering User",
          success : "Registered Successfully",
          error : "Something Went Wrong"
        }
      )
      if(response && response.data.success){
        setTimeout(()=>{
          navigate('/')
        },2000)
        return true;
      }else{
        return false;
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
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url('./images/background.jpeg')` }}>
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
            <h2 className="text-3xl mb-4 register-text">Register</h2>
            <p className="mb-4 register-account">Create Your Account</p>
            <form onSubmit = {handleSubmit}>
              <div className="grid w-full gap-5 lg:grid lg:grid-cols-2 lg:gap-5">
                <input type="text" placeholder="Firstname" className="border border-gray-400 p-2" value ={firstname} onChange ={(e)=>setFirstname(e.target.value)}/>
                <input type="text" placeholder="Lastname" className="border border-gray-400 p-2" value = {lastname} onChange = {(e)=>setLastname(e.target.value)}/>
              </div>
              <div className="mt-5">
                <input type="text" placeholder="Email" className="border border-gray-400 w-full p-2" value = {email} onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <div className="mt-5">
                <input type="password" placeholder="Password" className="border border-gray-400 w-full p-2" value = {password} onChange = {(e)=>setPassword(e.target.value)}/>
              </div>
              <div className="mt-5">
                <input type="password" placeholder="Confirm Password" className="border border-gray-400 w-full p-2" value = {confirmPassword} onChange = {(e)=>setConfirmPassword(e.target.value)}/>
              </div>
              <div className="mt-5">
                <input type="text" placeholder="Address" className="border border-gray-400 w-full p-2" value = {address} onChange = {(e)=>setAddress(e.target.value)}/>
              </div>
              <div className="mt-5">
                <input type="text" placeholder="Contact" className="border border-gray-400 w-full p-2" value = {phoneno} onChange = {(e)=>setPhoneno(e.target.value)}/>
              </div>
              <div className = "mt-3 font-serif">
                Already Registered ? <span className="text-blue-500 font-semibold"><Link to='/login'>Click Here!</Link></span>
              </div>
              <div className="mt-5">
                <button type = "submit" className="w-full bg-purple-500 py-3 text-center text-white font-semibold">Register</button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default Register;
