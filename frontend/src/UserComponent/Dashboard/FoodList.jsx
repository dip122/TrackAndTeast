import React, { useEffect, useState } from 'react'
import { useStorage } from '../../Context/StorageContext'
import { useAuth } from '../../Context/Context';
import FoodItem from './FoodItem';
import '../../Css/FoodList.css'
import { Foodbycategoryid } from '../../Apis/Apirouter';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Empty from '../Empty/Empty';

const FoodList = ({element}) => {

    const [foods,setFoods] = useState("");
    const navigate = useNavigate();
    const fetchFoodList = async (id) => {
        try {
            const url = Foodbycategoryid + id;//id of the category....fetch food of the category type (id)
            const response = await axios.get(url);
            if (response && response.data.success) {
                return response.data.menus;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    useEffect(()=>{
        const fetchFood = async()=>{
            try{
                const Foods = await fetchFoodList(element);//fetch foods by id where element is the id
                setFoods(Foods);//set Foods
            }catch(error){
                console.log(error);
            }
        }

        if(element){
            console.log(element);
            console.log(foods)
            fetchFood();
        }
    },[element])

    const handleClick = (id)=>{
        navigate(`/single-product/${id}`);
        console.log('clicked')
    }





  return (
    <>
        <section className="menu container mx-auto py-8">
            <h1 className="text-xl font-bold mb-14 text-center Food-header">Your Foods</h1>
            <div className ='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-16 px-5'>
                {foods.length > 0 ? (
                    foods.map((food,index)=>{
                        return (
                            <FoodItem key ={index} food = {food} handleClick = {handleClick}/>
                        )
                    })
                ) : (
                    <div className = "flex justify-center items-center text-center">Please select Category....</div>
                )}
            </div>
        </section>
    </>
  )
}

export default FoodList