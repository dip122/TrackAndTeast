import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
// import Navbar from '../../AdminComponent/Navbar/Navbar';
import Loading from '../../AdminComponent/Loading/Loading';
import { useAuth } from '../../Context/Context';
import axios from 'axios';
import { userorderapi } from '../../Apis/Apirouter';
import convert from './Convert';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../UserNavbar/Navbar'
import DetailsModal from '../../AdminComponent/DetailsModal/DetailsModal';
// import userorderapi from '../../Apis/Apirouter'

const MyOrders = () => {

  const [orders ,setOrders] = useState([]);
  const [auth ,setAuth] = useAuth();
  const navigate = useNavigate();
  const [isopen,setisopen] = useState(false)

  const togglemodal = ()=>{
    setisopen(!isopen);
    // console.log(isopen);
  }

  useEffect(()=>{
    const GetUserOrder = async()=>{
      // const id = auth?.user?._id; user id
      try{
        const response = await axios.get(userorderapi);
        if(response && response.data.success){
          setOrders(response.data.orders);
          // console.log(response.data.orders);
        }else{
          setOrders([]);
        }
      }catch(error){
        console.log(error);
        setOrders([]);
      }
    }


    if(auth && auth?.user){
      GetUserOrder();
    }
  },[auth && auth?.user]);

  const handleClick = (id)=>{
    navigate(`/order-track/${id}`);
  }
  return (
    <>
    <Navbar/>
    {(!(auth && auth?.user) || orders.length === 0) ? (<Loading/>) : (
    <section className = "table-section" style={{paddingTop : "70px"}}>
      <h3 className = "table-header">My Orders</h3>
      <div className = "table-container">
        <table>
          <thead>
            <tr>
              <th>Details</th>
              <th>Price</th>
              <th>Date</th>
              <th>Track</th>
            </tr>
          </thead>
            <tbody>
            {orders.map((order,index)=>{
              const {formattedDate, formattedTime} = convert(order?.createdAt);
              return (
                <tr key = {index}>
                    <td className = "text-left">
                      <Link className = "text-blue-600" onClick = {togglemodal}>Details</Link>
                      {isopen === true ? <DetailsModal isopen={isopen} element={order} togglemodal = {togglemodal}/> : ''}
                    </td>
                    <td className = "text-left">{order?.amount}</td>
                    <td className = "text-left"> Date :  {formattedDate}<br/> Time : {formattedTime}</td>
                    <td className = "text-left"><span className = "text-blue-500 cursor-pointer" onClick={()=>handleClick(order?._id)}>Track</span></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <ToastContainer/>
    </section>
  ) }
</>
  )
}

export default MyOrders