import React from 'react'
import { useStorage } from '../../Context/StorageContext'
import FoodItem from '../Dashboard/FoodItem';
import { useNavigate } from 'react-router-dom';

const TopRated = () => {

    const {topRatedFoods} = useStorage();
    const navigate = useNavigate();

    const handleClick = (id)=>{
        navigate(`/single-product/${id}`);
    }

    if(!topRatedFoods){
        <div className = "flex justify-center items-center font-semibold p-2">Loading...</div>
    }

  return (
    <section className ="menu container mx-auto py-8">
        <h1 className = "text-xl font-bold mb-14 text-center Food-header">Top Rated Foods</h1>
        <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-16 px-5">
            {topRatedFoods && topRatedFoods.map((food,index)=>{
                return (
                    <FoodItem key = {index} food={food} handleClick={handleClick}/>
                )
            })}
        </div>
    </section>
  )
}

export default TopRated