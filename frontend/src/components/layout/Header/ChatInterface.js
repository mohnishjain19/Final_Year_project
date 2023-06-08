import React, { useState } from 'react';
import axios from 'axios';
import './ChatInterface.css'; // Import a CSS file for custom styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

const ChatInterface = ({ handleCloseChat }) => {
  const [userMessage, setUserMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const handleUserMessageChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    if (userMessage.trim() !== '') {
      const message = { message: userMessage };
      const response = await axios.post('http://localhost:5000/api/v1/message', message);
      const assistantMessage = response.data;
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { role: 'user', content: userMessage },
        { role: 'assistant', content: assistantMessage },
      ]);
      setUserMessage('');
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };


  return (
    <div className="chat-popup">
      <button className="close-button" onClick={handleCloseChat}>
        &times;
      </button>
      <div className="chat-log">
        {chatLog.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={userMessage}
          onChange={handleUserMessageChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="message-input"
        />
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [isChatVisible, setChatVisible] = useState(false);

  const handleToggleChat = () => {
    setChatVisible((prevVisible) => !prevVisible);
  };

  const handleCloseChat = () => {
    setChatVisible(false);
  };

  return (
    <div className="app-container">
      {isChatVisible ? (
        <ChatInterface handleCloseChat={handleCloseChat} />
      ) : (
        <button className="chat-toggle-button" onClick={handleToggleChat}>
          <FontAwesomeIcon icon={faCommentDots} />
        </button>
      )}
    </div>
  );
};

export default App;
