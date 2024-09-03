import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/Context';
import axios from 'axios'
import { changepasswordapi } from '../../Apis/Apirouter';

const ChangePassword = ({isopen,toggleModal}) => {

    const [password,setPassword] = useState("");
    const [confirmpassword,setConfirmPassword] = useState("");
    const [wentwrong,setwentwrong] = useState(''); 
    const [auth,setAuth] = useAuth();

    useEffect(()=>{
        if(auth && auth?.user){
            setwentwrong('');
        }
    },[auth && auth?.user])

    const MakeValidation = ()=>{
        if(password !== confirmpassword) {
            setwentwrong('fail');
            return false;
        }else if(password === ""){
            setwentwrong('fail');
            return false;
        }
        setwentwrong('success')
        return true;
    }

    const ChangePassword = async(e)=>{
        e.preventDefault();
        if(!MakeValidation())return false;
        try{
            const formData = new FormData();
            formData.append('password',password);
            const response = await axios.post(changepasswordapi,formData,{
                withCredentials : true,
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            });
            if(response && response.data.success){
                setwentwrong('success');
                return true;
            }else{
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
    <div className = {`${isopen ? 'flex' : 'hidden'}
     overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-30 justify-center items-center w-full h-full bg-neutral-900 bg-opacity-70`}>
        <form className = "flex flex-col gap-8 justify-center items-center p-4 bg-orange-400 rounded-lg" onSubmit={ChangePassword}>
            <input type = "password" placeholder="Enter New Password" 
             className = "border border-gray-400 w-full p-2"
             value = {password}
             onChange={(e)=>setPassword(e.target.value)}
            />
            <input type = "password" placeholder="Confirm New Password" 
             className = "border border-gray-400 w-full p-2"
             value = {confirmpassword}
             onChange = {(e)=>setConfirmPassword(e.target.value)}
            />
            <div className = "flex flex-row justify-center items-center gap-6">
                <button type = "submit" className = "bg-purple-500 text-white font-semibold rounded-full py-2 px-5">Change</button>
                <button className = "bg-purple-500 text-white font-semibold rounded-full py-2 px-5" onClick = {toggleModal}>Close</button>
            </div>
            {wentwrong === 'fail' ? <div className = "text-center">something went wrong</div> : wentwrong === 'success' && <div className = "text-center">Password Updated</div>}
        </form>
    </div>
  )
}

export default ChangePassword