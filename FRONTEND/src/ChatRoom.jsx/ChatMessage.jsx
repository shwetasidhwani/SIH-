import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
    console.log(message.user);
    return (

        <div className="chat-message">
            <strong>(User ID){message.user}</strong>: {message.message}
        </div>
    );
};

export default ChatMessage;
