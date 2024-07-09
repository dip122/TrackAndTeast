import React, { useEffect, useState } from 'react'
import '../../Css/Track.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getorderbyidapi, socketbackendurl } from '../../Apis/Apirouter';
import { useAuth } from '../../Context/Context';
import Empty from '../Empty/Empty';
import { io } from 'socket.io-client';
var socket;

const OrderTrack = () => {

    const [status,setStatus] = useState("");
    const [order,setOrder] = useState({});
    const [auth,setAuth] = useAuth();
    const [Loading,setLoading] = useState(true);
    const [socketConnected,setSocketConnected] = useState(false);
    const {id} = useParams();
    useEffect(()=>{
        const getuserorder = async(id)=>{
            setLoading(true);
            try{
                const url = getorderbyidapi + id;
                // console.log(url);
                const response = await axios.get(url);
                if(response && response.data.success){
                    setOrder(response.data.order);
                    setStatus(response.data.order?.status)
                    setLoading(false);
                }else {
                    setOrder([]);
                    setStatus("");
                }
            }catch(error){
                setOrder([]);
                setStatus("")
                console.log(error);
            }
        }

        if(auth && auth?.user){
            getuserorder(id);
        }
    },[auth && auth?.user]);

    useEffect(()=>{
        if(auth && auth?.user && order?._id){
            const socket =io(`${socketbackendurl}`,{
                withCredentials : true
            });
            if(order){
                socket.emit('setup',`order_handle`);
            }
            socket.on('connection',()=>{
                console.log('connection')
                setSocketConnected(true)
            });

            socket.on('OrderUpdated', (data)=>{
                // console.log(data);
                console.log('socket working');
                console.log('order id is ' + order?._id);
                console.log(data.id);
                if(order?._id === data.id)setStatus(data.status)
            })

            if(order && order.length>0){
                console.log('yes');
            }
        }
    },[order])


    
  return (
    <>{Loading ? (<Empty/>) : (
        <section className = "order-status">
        <div className = "order-container mx-auto">
            <div className = "status-container w-full lg:w-2/3 mx-auto">
                <div className = "flex justify-between items-center mb-12">
                    <div className ="text-xl font-semibold">Track Your Food</div>
                    <h6 className = "bg-white py-1 rounded-full px-4 text-green-600 text-xs h6-class overflow-x-hidden">{order?._id}</h6>
                </div>
                <div className = "listitem">
                    <ul>
                        <li className = "status_line text-sm md:text-xl pb-16"><span className = {`span-style ${status === "order-placed" ? 'text-orange-500' : 'text-gray-400'}`}>Order Placed</span></li>
                        <li className = "status_line text-sm md:text-xl pb-16"><span className = {`span-style ${status === "order confirmed" ? 'text-orange-500' : 'text-gray-400'}`}>Order Confirmed</span></li>
                        <li className = "status_line text-sm md:text-xl pb-16"><span className = {`span-style ${status === "processing" ? 'text-orange-500' : 'text-gray-400'}`}>Processing </span></li>
                        <li className = "status_line text-sm md:text-xl pb-16"><span className = {`span-style ${status === "order-for-delivery" ? 'text-orange-500' : 'text-gray-400'}`}>Out For Delivery</span></li>
                        <li className = "status_line text-sm md:text-xl pb-16"><span className = {`span-style ${status === "completed" ? 'text-orange-500' : 'text-gray-400'}`}>Completed</span></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    )}</>
  )
}

export default OrderTrack