import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/Context';
import axios from 'axios';
import { deletecategoryapi, getallcategoryapi } from '../../Apis/Apirouter';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Loading/Loading';
import '../../Css/Table.css'
import Navbar from '../Navbar/Navbar';
import DeleteIcon from '../Icons/DeleteIcon';
import AddFood from '../Icons/AddFood';
import { useNavigate } from 'react-router-dom';

const AdminCategory = () => {

    const [category,setCategory] = useState([]);
    const [auth,setAuth] = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        const getallcategory = async()=>{
            try{
                const response = await axios.get(getallcategoryapi);
                if(response && response.data.success){
                    setCategory(response.data.getallcategory);
                }else{
                    setCategory([]);
                }
            }catch(error){
                console.log(error);
                setCategory([]);
            }
        }

        getallcategory();
    },[auth?.user]);

    const DeleteCategory = async(id)=>{
        try{
            const url = deletecategoryapi + id;
            const response = await toast.promise(
                axios.delete(url),
                {
                    pending : 'Delete Processing',
                    success : 'Category Successfully Deleted',
                    error : 'Something went wrong'
                }
            );
            if(response && response.data.success){
             const updatedcategory = category.filter((cat)=>cat._id !== id);
             setCategory(updatedcategory);
            }
        }catch(error){
            console.log(error);
            return false;
        }
    }

    const AddYourFood = (id)=>{
        navigate(`/addFood/${id}`);
    }
  return (
    <>
        <Navbar/>
        {!(auth && auth?.user) ? (<Loading/>) : (
        <section className = "table-section" style={{paddingTop : "70px"}}>
          <h3 className = "table-header">All Categories</h3>
          <div className = "table-container">
            <table>
              <thead>
                <tr>
                  <th>Sr.NO</th>
                  <th>Name</th>
                  <th>Action</th>
                  <th>AddFood</th>
                </tr>
              </thead>
                <tbody>
                {category.map((cat,index)=>{
                  return (
                    <tr key = {index}>
                        <td>{index+1}</td>
                        <td>{cat?.name}</td>
                        <td><div className = "icon" onClick = {()=>DeleteCategory(cat?._id)}><DeleteIcon/></div></td>
                        <td><div className = "icon" onClick={()=>AddYourFood(cat?._id)}><AddFood/></div></td>
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

export default AdminCategory