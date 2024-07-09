import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../Css/Navbar.css'
import Sidebar from '../SideBar/Sidebar';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [opensidebar,setopensidebar] = useState(true);
    const navigate = useNavigate();
    const toggleSidebar = ()=>{
        setopensidebar(!opensidebar);
        return opensidebar;
    }

    const handleClick = ()=>{
        navigate('/admin-reviews');
    }

  return (
    <>
    <div className = "navbar-section">
        <div className = "sidebar-section">
            <Sidebar isopen={opensidebar}/>
        </div>
        <div className = {`${opensidebar === true ? 'close-navbar' : 'open-navbar'}`} >
            <nav className="navbar flex items-center">
                <i className="fa-solid fa-bars" onClick = {toggleSidebar}/>
                <div className = "navbar-class ml-20 text-lg" onClick ={()=>handleClick()}>Reviews</div>
            </nav>
        </div>
    </div>
    </>

  )
}

export default Navbar