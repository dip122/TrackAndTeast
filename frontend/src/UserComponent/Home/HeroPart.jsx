import React from 'react'
import '../../Css/HeroPart.css'

const HeroPart = () => {
  return (
    <div className = "min-h-screen p-20 heropart flex flex-col items-center justify-center gap-5">
        <div className = "header-part">Order And Track Your Food</div>
        <div className = "description-part lg:w-3/4">Introducing our innovative app designed to 
        streamline your daily tasks effortlessly. Seamlessly manage your schedule, 
        stay organized with intuitive reminders, collaborate with ease, and enhance
         productivity—all within one convenient platform. Join us and unlock a world 
         of efficiency tailored to your needs, right at your fingertips</div>
    </div>
  )
}

export default HeroPart