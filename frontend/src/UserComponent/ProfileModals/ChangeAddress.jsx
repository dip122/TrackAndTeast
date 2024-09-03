import React, { useState } from 'react'
import axios from 'axios';
import { changeaddressapi } from '../../Apis/Apirouter';
import { useAuth } from '../../Context/Context';

const ChangeAddress = ({isopen,toggleModal}) => {

    const [address , setAddress] = useState("");
    const [contact,setContact] = useState("");
    const [wentwrong,setwentwrong] = useState("");
    const [auth,setAuth]= useAuth();

    const MakeValidation = ()=>{
        if(address === "" || contact === ""){
            setwentwrong('fail');
            return false;
        }else if(contact.length !== 10){
            setwentwrong('fail');
            return false;
        }
        setwentwrong('success');
        return true;
    }


    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!MakeValidation()){
            return false;
        }
        try{
            const formData = new FormData();
            formData.append('contact', contact);
            formData.append('address',address);
            const response = await axios.post(changeaddressapi,formData,{
                withCredentials : true,
                headers : {
                    "Content-Type" : "multipart/form-data",
                }
            });
            if(response && response.data.success){
                setwentwrong('success');
                setAuth({
                    ...auth,
                    user : response.data.user
                });
                const data = await JSON.parse(localStorage.getItem('user-Data'));
                data.user.contact = contact;
                data.user.address = address;
                await localStorage.removeItem('user-Data');
                await localStorage.setItem('user-Data', JSON.stringify(data));
                return true;
            }else {
                setwentwrong('fail');
                return false;
            }
        }catch(error){
            console.log(error);
            setwentwrong('fail');
            return false;
        }
    }
  return (
    <div className = {`${isopen ? "flex" : "hidden"}
        justify-center items-center fixed top-0 left-0 right-0 z-30 overflow-y-auto overflow-x-hidden w-full h-full bg-opacity-70 bg-neutral-900`}>
            <form className = "flex flex-col justify-center items-center gap-8 rounded-lg bg-neutral-300 p-4" onSubmit={handleSubmit}>
                <input type = "text" 
                 placeholder = "Enter New address" 
                 className = "border border-gray-400 w-full p-2"
                 value = {address}
                 onChange = {(e)=>setAddress(e.target.value)}
                />
                <input type = "text" 
                 placeholder = "Enter New Contact" 
                 className = "border border-gray-400 w-full p-2"
                 value = {contact}
                 onChange = {(e)=>setContact(e.target.value)}
                />
                <div className = "flex flex-row gap-6 justify-center items-center">
                    <button type = "submit" className = "bg-purple-500 py-2 px-5 text-white font-semibold rounded-full hover:bg-purple-600">Change</button>
                    <button className = "bg-purple-500 py-2 px-5 text-white font-semibold rounded-full hover:bg-purple-600" onClick={toggleModal}>Close</button>
                </div>
                {wentwrong === 'fail' ? <div className = "text-center">Something went wrong</div> : wentwrong === 'success' && <div className = "text-center">Details Updated</div>}
            </form>
    </div>
  )
}

export default ChangeAddress