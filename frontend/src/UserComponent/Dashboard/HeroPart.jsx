import React from 'react'
import '../../Css/HeroDashboard.css'

const HeroPart = () => {
  return (
    <div className = "home min-h-screen flex">
        <div className = "title flex flex-col justify-center items-center gap-4">
            <div className = "h1 text-center">Find Your Foods Here</div>
            <div className = "h1 h1-last text-center">Taste Foods And Enjoy</div>
            <div className = "p text-center w-3/4">"Discover delicious meals at your fingertips. Browse, order, 
                and enjoy from the best local restaurants. Fast delivery, fresh ingredients, 
                and flavors you'll love."
            </div>
        </div>
        <div className = "image-class">
            <img src="/images/burger.png" alt="Hello"/>
        </div>
    </div>

  )
}

export default HeroPart