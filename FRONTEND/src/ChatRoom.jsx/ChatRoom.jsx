import React, { useState, useEffect } from 'react';
import './ChatRoom.css';
import ChatMessage from './ChatMessage';
import axios from 'axios';

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Initialize messages
        axios.get('http://localhost:3000/api/chat/messages', { withCredentials: true })
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
    }, []);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            await axios.post('http://localhost:3000/api/chat/message', { message: newMessage }, { withCredentials: true })
                .then(response => {
                    console.log(response.data); 
                    setMessages([...messages, response.data]);
                    setNewMessage('');
                })
                .catch(error => {
                    console.error('Error sending message:', error);
                    alert("Cannot post updates without logging in!");
                });
        }
    };

    return (
        <div className="chatroom">
            <h1 className="chatroom-header">Virtual Chatroom</h1>
            <p className="chatroom-instructions">Please be respectful and courteous. Type your message below and click "Send" to participate in the chat.</p>
            <div className="chat-window">
                {messages.map((msg) => (
                    <div className="message-card" key={msg._id}>
                        <ChatMessage message={msg} />
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatRoom;
