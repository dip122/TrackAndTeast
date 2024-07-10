import React from 'react'
import HeroPart from './HeroPart'
import Category from './Category'
import TopRated from '../TopRatedProducts/TopRated'
import Contact from '../Home/Contact'
import Navbar from '../UserNavbar/Navbar'

const Dashboard = () => {
  return ( 
    <section className = "min-w-screen">
        <Navbar/>
        <HeroPart/>
        <Category/>
        <TopRated/>
        <Contact/>
    </section>
  )
}

export default Dashboard