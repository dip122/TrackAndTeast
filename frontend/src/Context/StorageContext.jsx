import React, { useState, useEffect, createContext, useContext, Children } from 'react';
import axios from 'axios';
import { getallFoodsapi, getcartapi, removecartapi, topRatedFoodsapi } from '../Apis/Apirouter';
import { useAuth } from './Context';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

// Create a context
export const StorageContext = createContext();

const StorageContextProvider = ({children}) => {
    const [cartItems ,setCartItems] = useState({});
    const [foodList,setFoodList] = useState([]);
    const [topRatedFoods,setTopRatedFoods] = useState([]);
    const [success , setsuccess] = useState("");
    const [auth,setAuth] = useAuth();
    


    const RemoveCart = async (itemId) => {
        const url = removecartapi
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        setsuccess('success');
        const response = await axios.put(url,{ItemId : itemId});
        if(response && response.data.success){
            console.log('true');
            return true;
        }else{
            return false;
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

    const loadCartData = async()=>{
        try{
            setCartItems(auth?.user?.cartData);
        }catch(error){
            console.log(error);
        }
    }

    const fetchTopRatedFoods = async()=>{
        try{
            const response = await axios.get(topRatedFoodsapi);
            if(response && response.data.success){
                setTopRatedFoods(response.data.products);
            }else{
                setTopRatedFoods([]);
            }
        }catch(error){
            console.log(error);
            setTopRatedFoods([]);
        }
    }

    const fetchFoodList = async()=>{
        try{
            const response = await axios.get(getallFoodsapi);
            if(response && response.data.success){
                setFoodList(response.data.Foods)
            }
        }catch(error){
            console.log(error);
        }
    }

    const Totalamount = ()=>{
        let amount = 0;
        for(const Item in cartItems){
            if(cartItems[Item] > 0){
                let FoodItem = foodList.find((food)=>food._id === Item);
                console.log(FoodItem)
                amount +=  FoodItem.price*cartItems[Item];
            }
        }
        console.log(amount);
        return amount;
    }

    useEffect(()=>{
        const DataLoad = async()=>{
            await loadCartData();
        }
        const fetchFoodData = async()=>{
            await fetchFoodList();
        }
        const fetchTopratedfoods = async()=>{
            await fetchTopRatedFoods();
        }
        if(auth && auth?.user?.role === false){
            DataLoad();
            fetchFoodData();
            fetchTopratedfoods();
        }
    },[(auth && auth?.user?.role === false)]);

    const contextvalue = { 
        RemoveCart,
        cartItems,
        setCartItems,
        loadCartData,
        topRatedFoods,
        foodList,
        Totalamount
    }

    return (
        <StorageContext.Provider value = {contextvalue}>
            {children}
        </StorageContext.Provider>
    );
};

const useStorage = ()=> useContext(StorageContext)

export {useStorage,StorageContextProvider};
