import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';


const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth,setAuth] = useState({
        user : null,
        token : "",
    });

    axios.defaults.headers.common["Authorization"] = auth?.token;//token will be set to the headers once the token is received from the frontend

    //to set the localstorage everytime when i refresh the page, whenever the page refresh localStorage items get erased
    //if the localstorage items get erased the token will be lost , so we have to save the token immediately
    useEffect(()=>{
        const jsondata = localStorage.getItem('user-Data');//whenever refresh happens , just set the localstorage
        if(jsondata){
            const data = JSON.parse(jsondata);
            setAuth({
                ...auth,
                user : data.user,
                token : data.token
            })
        }
        //eslint-disable-next-line
    },[]);

    return (
        <AuthContext.Provider value = {[auth,setAuth]}>{children}</AuthContext.Provider>
    )
}

const useAuth = ()=> useContext(AuthContext);

export {useAuth, AuthProvider};