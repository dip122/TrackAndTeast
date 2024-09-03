import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { getordersapi, updatestatus } from '../../Apis/Apirouter';
import { useAuth } from '../../Context/Context';
import Navbar from '../Navbar/Navbar';
import Loading from '../Loading/Loading';
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import DetailsModal from '../DetailsModal/DetailsModal';

const Orders = () => {

    const [orders ,setOrders] = useState([]);
    const [auth,setAuth] = useAuth();
    const [openmodal ,setopenmodal] = useState(false);
    const [status , setStatus] = useState("");
     
    useEffect(()=>{
        console.log('clicked')
        const GetAllOrders = async()=>{
            try{
                const response = await axios.get(getordersapi);
                if(response && response.data.success){
                    setOrders(response.data.orders);
                }else{
                    setOrders([]);
                    // console.log('clicked')
                }
            }catch(error){
                console.log(error);
                setOrders([]);
            }
        }
        if(auth && auth?.user){
            // console.log('clicked')
            GetAllOrders();
        }
    },[auth && auth?.user]);

    const tooglemodal = ()=>{
        setopenmodal(!openmodal);
        console.log(openmodal);
    }

    const handleChange = async(id, newstatus)=>{
      try{
        const url = updatestatus + id;
        const formData= new FormData();
        formData.append('status', newstatus)
        const response = await toast.promise(
          axios.put(url, formData,{
            withCredentials : true,
            headers : {
              "Content-Type" : "multipart/form-data"
            }
          }),{
            pending : "Status processing",
            error : "Something went wrong"
          }
        );
        if(response && response.data.success){
          toast.success("Order status Updated successfully");
          setOrders(prevorder => prevorder.map(order => order._id === id ? {...order , status : newstatus} : order))

        }else{
          toast.error("Fails to update the status");
        }
      }catch(error){
        console.log(error);
      }
    }

    const handleStatusChange = (event,id)=>{
      const newstatus = event.target.value;
      handleChange(id, newstatus);
    }

    
  return (
    <>
    <Navbar/>
    {(!(auth && auth?.user) || orders.length === 0) ? (<Loading/>) : (
    <section className = "table-section relative" style={{paddingTop : "70px"}}>
      <h3 className = "table-header">Admin Orders</h3>
      <div className = "table-container">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Address</th>
              <th>Contact</th>
              <th>items</th>
              <th>Status</th>
            </tr>
          </thead>
            <tbody>
            {orders.map((order,index)=>{
              return (
                <tr key = {index}>
                    <td>{order?._id}</td>
                    <td>{order?.address}</td>
                    <td>{order?.contact}</td>
                    <td>
                        <Link className = "text-blue-500" onClick ={tooglemodal}> Details</Link>
                        {openmodal === true ? <DetailsModal isopen={openmodal} element = {order} togglemodal={tooglemodal}/> : ''}
                    </td>
                    <td>
                      <select value = {order?.status} onChange = {(e)=>handleStatusChange(e,order?._id)}>
                        <option value = "order-placed">Order placed</option>
                        <option value = "order confirmed">Order Confirmed</option>
                        <option value = "processing">Processing</option>
                        <option value = "order-for-delivery">out for delivery</option>
                        <option value = "completed">Completed</option>
                      </select>
                    </td>
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

export default Orders