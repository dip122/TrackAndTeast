import React, { useEffect, useState } from 'react'
import '../../Css/Cart.css'
import { useStorage } from '../../Context/StorageContext'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { placeorderapi, verifyordercallbackurl } from '../../Apis/Apirouter';
import { useAuth } from '../../Context/Context';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '../../AdminComponent/Icons/DeleteIcon';

const Carts = () => {
  const {RemoveCart,cartItems,foodList,Totalamount} = useStorage();
  const [address,setAddress] = useState("");
  const [contact,setContact] = useState("");
  const [auth,setAuth] = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    // console.log(foodList);
    // console.log(cartItems);
  },[]);

  const MakeValidation = ()=>{
    if(!address || address === ""){
      toast.error("Please Give Your Address");
      return false;
    }else if(contact === "" || contact.length!==10){
      toast.error("Contact should be of 10 digits");
      return false;
    }
    return true;
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!MakeValidation())return false;
    let array = [];
    const amount = Totalamount();
    for(const Items in cartItems){
      if(cartItems[Items]>0){
        const Food = foodList.find((food)=>food._id === Items);
        array.push(Food);
      }
    }
    const formData = new FormData();
    formData.append('items',JSON.stringify(array));
    formData.append('amounts',amount);
    formData.append('address',address);
    formData.append('contact',contact);
    // console.log(amount);
    try{
      const response = await toast.promise(
        axios.post(placeorderapi,formData,{
          withCredentials : true,
          headers : {
            "Content-Type" : "multipart/form-data",
          }
        }),{
          pending : "Order Processing",
          error : "Something went wrong"
        }
      )
      if(response && response.data.success){

        const data = JSON.parse(localStorage.getItem('user-Data'));
        // console.log(data);
        data.user.cartData = {}
        await localStorage.removeItem('user-Data')
        await localStorage.setItem('user-Data',JSON.stringify(data));
        // console.log(response.data.payment.amount);
        // console.log(auth?.user?.firstname);
        var options = {
          "key": "rzp_test_lYpqk65Emj6Ks2", // Enter the Key ID generated from the Dashboard
          "amount": Number(response.data.payment.amount)*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          "currency": response.data.payment.currency,
          "name": "Food Order", //your business name
          "description": "Test Transaction",
          "image": "https://example.com/your_logo",
          "order_id": response.data.payment.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          "callback_url": `${verifyordercallbackurl}`,
          "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
              "name": auth?.user?.firstname + auth?.user?.lastname, //your customer's name
              "email": auth?.user?.email,
              "contact": auth?.user?.phoneno //Provide the customer's phone number for better conversion rates 
          },
          "notes": {
              "address": "Razorpay Corporate Office"
          },
          "theme": {
              "color": "#3399cc"
          }
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.open()
      }else{
        // console.log('clicked');
        return false;
      }
    }catch(error){
      console.log(error);
      return true;
    }
    return false;
  }

  const DeleteItem = async(id)=>{
    try{
      const response = await RemoveCart(id);
      if(response){
        toast.success("Removed From Cart");
      }
    }catch(error){
      console.log(error);

    }
  }
  return (
    <section className = "cart py-16 px-12">
      <div className = "mx-auto xl:w-2/3">
        <div className = "cart-header flex items-center mb-2 border-b border-gray-400 pb-4">
            <img src = "/images/cart_image.jpeg" alt = "cart-image"/>
            <div className = "text-2xl ml-4 header-text">My Orders Cart</div>
        </div>
        <div className = "food_list border-b border-gray-400 pb-4 md:px-3 lg:px-5">
          {foodList.length > 0 && foodList.map((food,index)=>{
            if(cartItems[food?._id] > 0){
              return (
                <div className = "flex justify-between" key = {index}>
                  <div key = {index} className = "flex items-center my-5">
                    <img src = {food?.image?.url} alt = "food_image" className = "h-24 w-24 rounded-xl"/>
                    <div className = "ml-4">
                      <div className = "font-sans font-semibold">{food?.name}</div>
                      <div className = "font-sans">{food?.size}</div>
                    </div>
                  </div>
                  <div className = "flex justify-center items-center">{cartItems[food?._id]} Pcs</div>
                  <div className = "flex justify-center items-center">₹ {food?.price}</div>
                  <div className = "delete-class flex justify-center items-center text-lg cursor-pointer" onClick={()=>DeleteItem(food?._id)}><DeleteIcon/></div>
                </div>
              )
            }
          })}
        </div>
        <form className = "w-1/2 ml-auto flex flex-col gap-y-5" onSubmit={handleSubmit}>
          <div className = "mt-5">
            <input type = "text" placeholder = "Enter Your Address" className = "border border-gray-400 w-full p-2" value ={address} onChange={(e)=> setAddress(e.target.value)}/>
          </div>
          <div className = "contact">
            <input type = "text" placeholder = "Enter Your Contact" className = "border border-gray-400 w-full p-2" value ={contact} onChange={(e)=>setContact(e.target.value)}/>
          </div>
          <button type = "submit" className = "w-3/4 lg:w-1/2 ml-auto bg-purple-500 py-2.5 text-center text-white font-semibold rounded-3xl">Order</button>
        </form>
        <ToastContainer/>
      </div>
    </section>
  )
}

export default Carts