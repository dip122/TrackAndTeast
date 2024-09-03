import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/Context';
import axios from 'axios'
import { Outlet } from 'react-router-dom';
import Loading from '../AdminComponent/Loading/Loading';

const UserRouter = () => {

    const [ok,setOk] = useState(false);
    const [auth,setAuth] = useAuth();

    useEffect(()=>{
        const AuthCheck  = async()=>{
            if(auth && auth?.user){
                setOk(true);
            }else setOk(false)
        }
        if(auth && auth?.token){

            AuthCheck();
        }
        console.log('value of ok', ok)
    },[auth && auth?.token]);


   return (
     ok ? <Outlet/> : <Loading/>
  )
}

export default UserRouter