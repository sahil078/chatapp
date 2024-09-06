// client/src/App.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages, addMessage } from './actions/chatActions';
import socket from './socket';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('chatHistory', (history) => {
      dispatch(setMessages(history));
    });

    socket.on('receiveMessage', (newMessage) => {
      dispatch(addMessage(newMessage));
    });

    return () => {
      socket.off('chatHistory');
      socket.off('receiveMessage');
    };
  }, [dispatch]);

  const sendMessage = () => {
    const newMessage = { text: message, sender: 'User' };
    socket.emit('sendMessage', newMessage);
    setMessage('');
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-box">
          {messages.map((msg, idx) => (
            <div key={idx} className="message">
              {msg.sender}: {msg.text}
            </div>
          ))}
        </div>
        <div className="input-box">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
