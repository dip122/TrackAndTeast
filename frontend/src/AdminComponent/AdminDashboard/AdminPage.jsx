import React from 'react'
import Navbar from '../Navbar/Navbar'

const AdminPage = () => {
  return (
    <>
        <Navbar/>
        <div className = "admin-dashboard min-h-screen flex justify-center items-center">
            <div className = "font-semibold text-2xl">Admin Dashboard!</div>
        </div>
    </>
  )
}

export default AdminPage