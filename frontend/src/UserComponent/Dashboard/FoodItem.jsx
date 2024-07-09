import React, { useEffect, useState } from 'react'
import '../../Css/FoodList.css'
import { useStorage } from '../../Context/StorageContext'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { addToCartapi } from '../../Apis/Apirouter';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/Context';

const FoodItem = ({food , handleClick}) => {

    const {cartItems,setCartItems} = useStorage();
    const [success , setsuccess] = useState('');
    const navigate = useNavigate();
    const [auth,setAuth] = useAuth();

    const addToCart = async(ItemId)=>{
        console.log('clicked');
        const url = addToCartapi;
        // console.log(cartItems);
        if(!cartItems[ItemId]){
            setCartItems((prev)=>({...prev , [ItemId] : 1}));
            setsuccess('success');
        }else{
            setCartItems((prev)=> ({...prev, [ItemId] : prev[ItemId] + 1}));
            setsuccess('success');
        }
        try{
            const formData = new FormData();
            formData.append('ItemId',ItemId);
            const response = await axios.post(url,formData,{
                withCredentials : true,
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            });
            if(response && response.data.success){
                toast.success(response.data.message,{autoClose : 100});
            }
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        if(success === 'success' && auth && auth?.user){
            const data =  JSON.parse(localStorage.getItem('user-Data'));
            data.user.cartData = cartItems;
            localStorage.removeItem('user-Data');
            localStorage.setItem('user-Data', JSON.stringify(data));
        }
    },[cartItems])


  return (
    <div className="w-full md:w-64 foodItem">
        <img className="h-40 w-40 mb-4 mx-auto rounded-2xl cursor-pointer" src={food.image?.url} alt={food.name} onClick={()=>handleClick(food?._id)}/>
        <div className = "text-center">
            <h2 className = "mb-4 text-lg">{food?.name}</h2>
            <span className = 'py-1 px-4 rounded-full uppercase text-xs'>{food?.size}</span>
            <div className = "button-classes flex items-center justify-around mt-6">
                <span className = 'text-lg'>₹ {food?.price}</span>
                <button className = "add-to-cart py-1 px-6 rounded-full flex items-center">
                    <span>+</span>
                    <span className = "ml-4" onClick={()=>addToCart(food?._id)}>Add</span>
                </button>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default FoodItem