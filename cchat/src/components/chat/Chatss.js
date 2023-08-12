import React, { useEffect, useState } from 'react'
import './chat.css'
import Message from '../message/Message'
import Join,{user} from "../Join/Join"
import ReactScrollToBottom from 'react-scroll-to-bottom'
import socketIo from 'socket.io-client'
import logo from './artificial-intelligence.png'
import close from './close.png'
const ENDPOINT = "http://localhost:4500/";

let socket;

const Chatss = () => {
  const [id, setid] = useState("")
  const [message, setmessage] = useState([])
  const send=()=>{
    let message=document.getElementById("chatInput").value;

    socket.emit('message',{message,id})
    document.getElementById("chatInput").value="";
  }

  useEffect(() => { 
      socket=socketIo(ENDPOINT,{transports:['websocket']});
      socket.on("connect",()=>{
          console.log("Connected");
          setid(socket.id);
      })
    //   console.log(socket)
      socket.emit('joined',{ user });
       
      socket.on('welcome',(data)=>{
          setmessage([...message,data]);
          console.log(data.user,data.message);
        });
        socket.on("userJoined",(data)=>{
          setmessage([...message,data]);
        console.log(data.user,data.message);
        })
        socket.on("leave",(data)=>{
          setmessage([...message,data]);
          console.log(data.user,data.message);
        })
      return () => {
        // socket.on('disconnect');
        // socket.off();
        socket.disconnect();
      }
    }, [])
    

    useEffect(() => {
      socket.on('sendMessage',(data)=>{
        setmessage([...message,data]);
        console.log(data.user,data.message,data.id);
      })
    
      return () => {
        socket.off();
      }
    }, [message])
    
    
  return (
    <div className='chatPage'>
        <div className="chatContainer">
            <div className="header"> 
            <img src={logo} alt="Robot" className='logo' />
            <a href="/"><img src={close} alt="Close" className='close'/></a>
            </div>
            <ReactScrollToBottom className="chatBox">
              {message.map((item,i)=><Message user={item.id===id?'':item.user}message={item.message} classs={item.id===id?'right':'left'}/>)}
              </ReactScrollToBottom>
            <div className="inputBox">
                <input onKeyPress={(e)=>e.key=="Enter"?send():null} type="text" id='chatInput' placeholder='Enter Message...' autoFocus/>
                <button onClick={send}>SEND</button>
            </div>
        </div>    
    </div>
  )
}

export default Chatss



