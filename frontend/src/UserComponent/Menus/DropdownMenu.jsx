import React, { useState } from 'react'
import { RiLockPasswordLine } from "react-icons/ri";
import ChangePassword from '../ProfileModals/ChangePassword';
import ChangeAddress from '../ProfileModals/ChangeAddress';
import { PiAddressBook } from "react-icons/pi";

const DropdownMenu = () => {
    const [isOpenPasswordModal,setIsOpenPasswordModal] = useState(false);
    const [isOpenAddressModal,setIsOpenAddressModal] = useState(false);
    const toggleModal = ()=>{
        setIsOpenPasswordModal(!isOpenPasswordModal)
    }

    const toggleModalAddress = ()=>{
        setIsOpenAddressModal(!isOpenAddressModal);
    }
    //
  return (
    <div id="dropdown-menu"
     className = "absolute right-0 top-12 z-10 w-64 p-2 space-y-1 rounded-lg shadow-lg text-sm text-neutral-800 divide-neutral-400 border border-neutral-300 bg-neutral-200">
        <ul>
            <li>
                <div className = "flex items-center gap-2 p-3 hover:bg-neutral-300 rounded-lg cursor-pointer" onClick ={toggleModal}>
                    <RiLockPasswordLine className = "h-6 w-6"/>
                    <span className = "flex-1 overflow-hidden text-ellipsis">ChangePassword</span>
                </div>
                {isOpenPasswordModal && <ChangePassword isopen={isOpenPasswordModal} toggleModal ={toggleModal}/>}
            </li>
            <li>
                <div className = "flex items-center gap-2 p-3 hover:bg-neutral-300 rounded-lg cursor-pointer" onClick ={toggleModalAddress}>
                    <PiAddressBook className = "h-6 w-6"/>
                    <span className = "flex-1 overflow-hidden text-ellipsis">ChangeAddress</span>
                </div>
                {isOpenAddressModal && <ChangeAddress isopen={isOpenAddressModal} toggleModal ={toggleModalAddress}/>}
            </li>
        </ul>
    </div>
  )
}

export default DropdownMenu