import React from 'react'
import '../../Css/success.css';
import { useNavigate } from 'react-router-dom';

const Success = () => {

  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate('/dashboard');
  }


  return (
    <div className = "body">
      <div className="card">
        <div style={{borderRadius: 200, height: 200, width: 200, background: '#F8FAF5', margin: '0 auto'}}>
          <i className="checkmark">✓</i>
        </div>
        <h1>Success</h1> 
        <p>We received your purchase request;<br /> we'll be in touch shortly!</p>
        <button className = "bg-green-500 text-white py-2 px-2 font-semibold mt-5 rounded-lg w-1/2 hover:bg-green-600" onClick = {()=>handleClick()}>Home</button>
     </div>
    </div>
  )
}

export default Success