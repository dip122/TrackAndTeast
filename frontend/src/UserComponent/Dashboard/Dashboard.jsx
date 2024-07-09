import React from 'react'
import HeroPart from './HeroPart'
import Category from './Category'
import FoodList from './FoodList'
import TopRated from '../TopRatedProducts/TopRated'
import Contact from '../Home/Contact'
import Navbar from '../UserNavbar/Navbar'

const Dashboard = () => {
  return (
    <>  
        <Navbar/>
        <HeroPart/>
        <Category/>
        <TopRated/>
    </>
  )
}

export default Dashboard