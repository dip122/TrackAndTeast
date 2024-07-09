import React from 'react'
import HeroPart from './HeroPart'
import Services from './Services'
import Contact from './Contact'
import Navbar from '../UserNavbar/Navbar'

const Home = () => {
  return (
    <section>
        <Navbar/>
        <HeroPart/>
        <Services/>
        <Contact/>
    </section>
  )
}

export default Home