import React, { useState } from 'react'
import './join.css'
import logo from '../../img/wechat.png'
import { Link } from 'react-router-dom'
import robo from './robot.gif'
let user;
const senduser=()=>{
    user=document.getElementById("joinInput").value;

    document.getElementById("joinInput").value="";
}
const Join = () => {
   const [name, setname] = useState("");
  return (
    <div className='JoinPage'>
        <div className="JoinContainer">
            <img src={logo} alt="" />
            <h1>R-Chat</h1>
            <input type="text" id='joinInput' placeholder='Enter Name' onChange={(e)=>{setname(e.target.value)}} autoFocus/>
            <Link onClick={(e)=>!name?e.preventDefault():null} to="/chat"><button onClick={senduser} className='joinbtn'>Log-In</button></Link>
            
        </div>    
    </div>
  )
}

export default Join;
export {user};