import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { addcategoryapi } from '../../Apis/Apirouter';
import { useAuth } from '../../Context/Context';
import Loading from '../Loading/Loading';

const AddCategory = () => {

  const [category,setCategory] = useState("");
  const [auth,setAuth] = useAuth();

  

  const handleSubmit = async(e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    if(category === ""){
      toast.error("Please Enter Category");
      return false;
    }else if(!auth?.user){
      return <Loading/>
    }
    try{
      const formData = new FormData();
      formData.append('name',category);
      await toast.promise(
        axios.post(addcategoryapi,formData,{
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }),
        {
          pending : "Category Processing",
          success : "Category successfully added",
          error : "Something went wrong"
        }
      )
      return true;
    }catch(error){
      console.log(error);
      return false;
    }
  }

  return (
    <>
    <Navbar/>
    <div className = "addCategory-container">
      <div className="flex flex-col justify-center items-center mx-auto min-h-screen" style={{paddingTop: "20px"}}>
        <div className="addFood mt-15">Add Category</div>
        <form className="w-full lg:w-1/2 py-5 px-10" onSubmit={handleSubmit}>
          <div className="mt-5">
            <input type="text" placeholder="Name Your Food" className="border border-gray-400 w-full p-2" value = {category} onChange={(e)=>setCategory(e.target.value)}/>
          </div>
          <div className="mt-5">
            <button type="submit" className="w-full bg-purple-500 py-3 text-center text-white font-semibold">Add Category</button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
    </>
  );
}

export default AddCategory;
