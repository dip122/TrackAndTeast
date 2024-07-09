import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { addfoodapi } from '../../Apis/Apirouter';

const AddFood = () => {


  const [name,setName] = useState("");
  const [price,setPrice] = useState("")
  const [size,setSize] = useState("");
  const [description,setDescription] = useState("");
  const [image,setImage] = useState(null);
  const {id} = useParams();

  const MakeValidation = async(e)=>{
    if(name.length<3){
      toast.error("Name should be at least 3 characters");
      return false;
    }
    if(price === 0){
      toast.error("Please enter some price");
      return false;
    }
    if(description.length < 10){
      toast.error("Please add some description");
      return true;
    }
    if(image === null){
      toast.error("Please Enter Image of Food");
      return false;
    }
    return true;
  }

  const handleSubmit = async(e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    if(!MakeValidation())return false;
    try{
      const formData = new FormData();
      formData.append('name',name);
      formData.append('categoryid',id);
      formData.append('price',price);
      formData.append('size',size);
      formData.append('description',description);
      formData.append('image',image);
      const response = await toast.promise(
        axios.post(addfoodapi,formData,{
          withCredentials : true,
          headers : {
            "Content-Type" : "multipart/form-data",
          }
        }),
        {
          pending : "Processing....",
          error : "Something went wrong"
        }
      );

      if(response && response.data.success){
        toast.success(response.data.message);
      }
    }catch(error){
      console.log(error);
      return false;
    }
  }

  return (
    <>
    <Navbar/>
    <div className = "addFood-container">
      <div className="flex flex-col justify-center items-center mx-auto min-h-screen" style={{paddingTop: "70px"}}>
        <div className="addFood mt-15">Add Food</div>
        <form className="w-full lg:w-3/5 py-5 px-10" onSubmit={handleSubmit}>
          <div className="mt-5">
            <input type="text" placeholder="Name Your Food" className="border border-gray-400 w-full p-2" value = {name} onChange ={(e)=>setName(e.target.value)}/>
          </div>
          <div className="mt-5">
            <input type="number" placeholder="Price" className="border border-gray-400 w-full p-2" value = {price} onChange ={(e)=>setPrice(e.target.value)}/>
          </div>
          <div className="mt-5">
            <input type="text" placeholder="Size" className="border border-gray-400 w-full p-2" value ={size} onChange ={(e)=>setSize(e.target.value)}/>
          </div>
          <div className="mt-5">
            <textarea placeholder="Description" rows="7" className="border border-gray-400 w-full p-2" value ={description} onChange ={(e)=>setDescription(e.target.value)}/>
          </div>
          <div className="mt-5">
            <input type="file" accept=".jpeg, .png, .jpg" className="border border-gray-400 w-full p-2" name="image" onChange={(e)=>setImage(e.target.files[0])}/>
          </div>
          <div className="mt-5">
            <button type="submit" className="w-full bg-purple-500 py-3 text-center text-white font-semibold">Add Food</button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
    </>
  );
}

export default AddFood;
