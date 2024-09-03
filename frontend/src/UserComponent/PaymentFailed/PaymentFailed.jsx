import React from 'react'
import '../../Css/failed.css'
import { useNavigate } from 'react-router-dom'

const PaymentFailed = () => {

  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate('/dashboard')
  }
  return (
<div className="row justify-content-center">
  <div className="col-md-5">
    <div className="message-box _success _failed">
      <i className="fa fa-times-circle" aria-hidden="true" />
      <h2> Your payment failed </h2>
      <p>  Try again later </p>
      <button className = "bg-purple-500 p-2 w-2/5 font-semibold text-white rounded-lg mt-5 hover:bg-purple-600" onClick = {handleClick}>Home</button>
    </div> 
  </div> 
</div>

  )
}

export default PaymentFailed