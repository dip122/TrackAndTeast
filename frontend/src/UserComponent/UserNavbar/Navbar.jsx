import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../Css/UserNavbar.css';
import { useAuth } from '../../Context/Context';
import { FaRegUser } from "react-icons/fa";
import DropdownMenu from '../Menus/DropdownMenu';

const Navbar = () => {
  const [isMenuDropDownOpen, setIsMenuDropDownOpen] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [isOpenMenu,setIsOpenMenu] = useState(false)


  const toggleDropDownMenu = () => {
    setIsMenuDropDownOpen(!isMenuDropDownOpen);
  };

  const toggleMenu = ()=>{
    setIsOpenMenu(!isOpenMenu)
  }

  const handleClick = ()=>{
    console.log('click')
    navigate('/cart')
  }

  const handleLogout = async()=>{
    const data = await localStorage.getItem('user-Data');
    localStorage.removeItem('user-Data');
    navigate('/');
    window.location.reload()
  }

  return (
    <section className="bg-white text-xl py-3">
      <nav className="flex justify-between items-center w-[92%] mx-auto">
        <div className="w-16">
          <div className="Navbar-header cursor-pointer">BiteAndSlice</div>
        </div>
        <div className="hidden md:block navbar-acc">
          <ul className="flex items-center gap-[4vw]">
            {(auth && auth?.user?.role === false) ? (
                <>
                    <li>
                        <Link to="/dashboard" className="hover:text-gray-500">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/user-order" className="hover:text-gray-500">MyOrders</Link>
                    </li>
                </>
            ) : (
                (auth && (auth?.user?.role === true)) ?(
                    <>
                        <li>
                            <Link to="/adminDashboard" className="hover:text-gray-500">Admin</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/" className="hover:text-gray-500">Home</Link>
                        </li>
                    </>
                )
            )}
          </ul>
        </div>
        <div className="md:block hidden md:flex md:items-center md:gap-x-4">
            {(auth && (auth?.user?.role === false)) ? (
                <>
                    <div className = "flex-grow">
                        <button className="text-center rounded-xl px-1 cursor-pointer" onClick = {handleClick}>
                            <img src={`/images/cart.png`} alt="Cart" className="h-8 w-10" />
                        </button>
                    </div>
                    <div className = "flex-grow" onClick = {handleLogout}>
                        <button className="bg-purple-500 text-center text-white font-semibold rounded-full py-2 px-5 hover:bg-purple-600 text-base hover:outline-none">Logout</button>
                    </div>
                </>
            ) : (
                ((auth && auth?.user?.role === true) ? (
                    <>
                        <div className = "flex-grow" onClick = {handleLogout}>
                            <button className="bg-purple-500 text-center text-white font-semibold rounded-full py-2 px-5 hover:bg-purple-600 text-base">Logout</button>
                        </div> 
                    </>
                ) : (
                    <>
                        <div className = "flex-grow" onClick = {()=>navigate('/login')}>
                            <button className="bg-purple-500 text-center text-white font-semibold rounded-full py-2 px-5 hover:bg-purple-600 text-base">Login</button>
                        </div>
                    </>
                ))
            )}
        </div>
        <div className="block md:hidden">
          <button onClick={toggleMenu} className="bg-purple-500 text-center text-white font-semibold py-2 px-5 hover:bg-purple-600 rounded-full">
            <div className="Menu">{isOpenMenu ? 'close' : 'open'}</div>
          </button>
        </div>
      </nav>
      <div
        className={`${
          isOpenMenu ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } md:hidden navbar-acc overflow-hidden transition-all ease-in-out duration-300`}>
        <ul className="flex flex-col items-center gap-4 mt-4">
        {(auth && (auth?.user?.role === false)) ? (
                <>
                    <li>
                        <Link to="/dashboard" className="hover:text-gray-500">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/user-order" className="hover:text-gray-500">MyOrders</Link>
                    </li>
                    <li>
                        <button className="text-center rounded-xl px-1 cursor-pointer" onClick={handleClick}>
                            <img src={`/images/cart.png`} alt="Cart" className="h-10 w-12" />
                        </button>
                    </li>
                    <li>
                        <button className="bg-purple-500 text-center text-white font-semibold rounded-full py-2 px-5 hover:bg-purple-600 text-base" onClick={handleLogout}>Logout</button>
                    </li>
                </>
            ) : (
                (auth && auth?.user?.role === true) ?(
                    <>
                        <li>
                            <Link to="/adminDashboard" className="hover:text-gray-500">Admin</Link>
                        </li>
                        <li>
                            <button className="bg-purple-500 text-center text-white font-semibold rounded-full py-2 px-5 hover:bg-purple-600 text-base" onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/" className="hover:text-gray-500">Home</Link>
                        </li>
                        <li>
                            <button className="bg-purple-500 text-center text-white font-semibold rounded-full py-2 px-5 hover:bg-purple-600 text-base" onClick={()=>navigate('/login')}>Login</button>
                        </li>
                    </>
                )
            )}
        </ul>
      </div>
    </section>
  );
};

export default Navbar;
