import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../Context/Context';
import { Outlet } from 'react-router-dom';
import Loading from '../AdminComponent/Loading/Loading';

const ProtectedRouter = () => {

    const [ok,setOk] = useState(false);
    const [auth,setAuth] = useAuth();

    useEffect(()=>{
        const AuthCheck = async()=>{
            try{
                const response = auth?.user?.role === true;
                if(response){
                    setOk(true);
                }else{
                    setOk(false);
                }
            }catch(error){
                console.log(error);
                setOk(false)
            }
        }

        if(auth && auth?.token){
            AuthCheck();
        }

    },[auth && auth?.token])


  return ok ? <Outlet/> : <Loading/>
}

export default ProtectedRouter