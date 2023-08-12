import React from 'react'
import './message.css'
const Message = ({user,message,classs}) => {
    if(user && message){
        return (
            <div className={`messageBox ${classs}`}>
                {`${user}: ${message}`}
            </div>
        )
    }
    else if(message){
        return (
            <div className={`messageBox ${classs}`}>
                {`You: ${message}`}
            </div>
        )
    }
}

export default Message