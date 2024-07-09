import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/Context';
import Loading from '../Loading/Loading';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { deletefoodapi, getallFoodsapi } from '../../Apis/Apirouter';
import DeleteIcon from '../Icons/DeleteIcon';
import '../../Css/Table.css'
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
const AdminFoods = () => {

    const [foods,setFoods] = useState([]);
    const [auth,setAuth] = useAuth();

    useEffect(()=>{

        const GetAllFoods = async()=>{
            try{
                const url = getallFoodsapi;
                const response = await toast.promise(
                    axios.get(url),
                    {
                        pending : "Food Processing"
                    }
                )
                if(response && response.data.success){
                    // console.log('yes')
                    setFoods(response.data.Foods);
                }else{
                    setFoods([]);
                }
            }catch(error){
                // console.log(error);
                setFoods([]);
            }
        }

        if(auth && auth?.user){
            GetAllFoods();
        }
    },[auth?.user]);

    const DeleteFood = async(id)=>{
        try{
            const url = deletefoodapi + id;
            const response = await toast.promise(
                axios.delete(url),
                {
                    pending : 'Processing...',
                    error : 'Something went wrong'
                }
            );
            if(response && response.data.success){
                toast.success('Food Deleted successfully');
                const Foods = foods.filter((food)=>food._id !== id);
                setFoods(Foods);
                return true;
            }else{
                setFoods([]);
            }
        }catch(error){
            console.log(error);
        }
    }
  return (
    <>
    <Navbar/>
    {!(auth && auth?.user) ?  (
        <Loading/>
    ) : (
        <section className = "table-section" style={{paddingTop : "70px"}}>
            <h3 className = "table-header">Foods</h3>
            <div className = "table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Pic</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Details</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foods.length >0 && foods.map((food,index)=>{
                            return (
                                <tr key = {index}>
                                    <td><img src ={food?.image?.url}/></td>
                                    <td>{food?.name}</td>
                                    <td>{food?.category?.name}</td>
                                    <td><Link style={{color: "blue" , cursor : "pointer"}}>Details</Link></td>
                                    <td onClick = {()=>DeleteFood(food?._id)}><DeleteIcon/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <ToastContainer/>
        </section>
    )}
</>
  )
}

export default AdminFoods