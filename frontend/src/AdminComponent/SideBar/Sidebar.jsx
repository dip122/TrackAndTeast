import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import '../../Css/Sidebar.css'
import AddIcons from '../Icons/AddIcons'
import AddFood from '../Icons/AddFood'
import Userorder from '../Icons/Userorder'
import Users from '../Icons/Users'
import Logout from '../Icons/Logout'
import DashboardIcon from '../Icons/DashboardIcon'

const Sidebar = ({isopen}) => {

    const navigate = useNavigate();

    const Logouthandle = ()=>{
        localStorage.removeItem('user-Data');
        navigate('/');
        window.location.reload();
    }

    console.log(isopen)
  return (
        <nav className = {`sidebar ${isopen ? 'translate-x-0' : '-translate-x-full'} duration-300 ease-in-out`}>
            <Link to = "/adminDashboard" className = "logo">Admin Panel</Link>
            <div className = "sidebar-container">
                <div className = "menu-content">
                    <ul className = "menu-items">
                        <li className ="items">
                            <Link to = '/adminDashboard' className = "menu-links">
                                <div className = "menu-icons"><DashboardIcon/></div>
                                <div className = "text">Dashboard</div>
                            </Link>
                        </li>
                        <li className ="items">
                            <Link to = '/addCategory' className = "menu-links">
                                <div className = "menu-icons"> <AddIcons/> </div>
                                <div className = "text">AddCategory</div>
                            </Link>
                        </li>
                        <li className ="items">
                            <Link to = '/admincategory' className = "menu-links">
                                <div className = "menu-icons"> <AddFood/> </div>
                                <div className = "text">Categories</div>
                            </Link>
                        </li>
                        <li className ="items">
                            <Link to = '/AdminFoods' className = "menu-links">
                                <div className = "menu-icons"> <Users/> </div>
                                <div className = "text">Foods</div>
                            </Link>
                        </li>
                        <li className ="items">
                            <Link to = '/admin-orders' className = "menu-links">
                                <div className = "menu-icons"> <Userorder/> </div>
                                <div className = "text">Users Orders</div>
                            </Link>
                        </li>
                        <li className ="items">
                            <Link to = '/adminusers' className = "menu-links">
                                <div className = "menu-icons"> <Userorder/> </div>
                                <div className = "text">Users</div>
                            </Link>
                        </li>
                        <li className ="items">
                            <Link to = '/admincontacts' className = "menu-links">
                                <div className = "menu-icons"> <Userorder/> </div>
                                <div className = "text">Contacts</div>
                            </Link>
                        </li>
                        <li className ="items">
                            <Link to = '/admin-reviews' className = "menu-links">
                                <div className = "menu-icons"> <Userorder/> </div>
                                <div className = "text">Reviews</div>
                            </Link>
                        </li>

                    </ul>
                </div>
                <div className = "logout-container cursor-pointer" onClick = {Logouthandle}>
                    <div className = "text-logout">
                        <div className = "logout-section"><Logout/></div>
                        <div className = "text-logout">Logout</div>
                    </div>
                </div>
            </div>

        </nav>
  )
}

export default Sidebar