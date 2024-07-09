import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/Context';
import Loading from '../Loading/Loading';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { getalluserapi } from '../../Apis/Apirouter';

const Users = () => {
  const [users ,setUsers] = useState([]);
  const [auth,setAuth] = useAuth();

  useEffect(()=>{
    const Getalluser = async()=>{
      try{
        const response = await axios.get(getalluserapi);
        if(response && response.data.success){
          setUsers(response.data.users);
        }else{
          setUsers([]);
        }
      }catch(error){
        console.log(error);
        setUsers([]);
        return false;
      }
    }

    if(auth && auth?.user){
      Getalluser();
    }
  },[auth?.user])
  return (
    <>
    <Navbar/>
    {!(auth && auth?.user) ?  (
        <Loading/>
    ) : (
        <section className = "table-section" style={{paddingTop : "70px"}}>
            <h3 className = "table-header">Users</h3>
            <div className = "table-container">
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phoneno</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length >0 && users.map((user,index)=>{
                            return (
                                <tr key = {index}>
                                    <td>{index+1}</td>
                                    <td>{`${user?.firstname} ${user?.lastname}`}</td>
                                    <td>{user?.email}</td>
                                    <td>{user?.phoneno}</td>
                                    <td>{user?.address}</td>
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

export default Users