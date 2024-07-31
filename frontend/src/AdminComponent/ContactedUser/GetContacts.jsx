import React, { useEffect, useState } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../../Css/Table.css';
import Loading from '../Loading/Loading';
import Navbar from '../Navbar/Navbar';
import { useAuth } from '../../Context/Context';
import DeleteIcon from '../Icons/DeleteIcon';
import { deletecontactapi, getcontactsapi } from '../../Apis/Apirouter';

const GetContacts = () => {

    const [auth,setAuth] = useAuth();
    const [contacts,setContacts] = useState([]);

    useEffect(()=>{

        const GetContacts = async()=>{
            try{
                const response = await axios.get(getcontactsapi);
                if(response && response.data.success){
                    setContacts(response.data.contacts)
                }else{
                    setContacts([]);
                }
            }catch(error){
                console.log(error);
                setContacts([]);
            }
        }

        if(auth && auth?.user){
            GetContacts();
        }
    },[auth?.user])

    const DeleteContact = async(id)=>{
        try{
            const url = deletecontactapi + id;
            const response = await toast.promise(
                axios.delete(url),
                {
                    pending : "Processing...",
                    error : "Something Went Wrong"
                }
            );
            if(response && response.data.success){
                toast.success("Successfully Deleted");
                const updatedcontacts = contacts.filter((contact)=>contact._id !== id);
                setContacts(updatedcontacts);
                return true;
            }else return false;
        }catch(error){
            console.log(error);
            return false;
        }
    }
  return (
    <>
    <Navbar/>
    {!(auth && auth?.user) ?  (
        <Loading/>
    ) : (
        <section className = "table-section" style={{paddingTop : "70px"}}>
            <h3 className = "table-header">Contacts</h3>
            <div className = "table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.length >0 && contacts.map((contact,index)=>{
                            return (
                                <tr key = {index}>
                                    <td>{contact?.name}</td>
                                    <td>{contact?.email}</td>
                                    <td>{contact?.description}</td>
                                    <td><div className = "icon" onClick = {()=>DeleteContact(contact?._id)}><DeleteIcon/></div></td>
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

export default GetContacts