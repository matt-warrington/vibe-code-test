import React, { useEffect, useState } from 'react';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetch('/api/chat')
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch(() => setMessages([]));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: newMessage })
    })
      .then((res) => res.json())
      .then((msg) => {
        setMessages((prev) => [...prev, msg]);
        setNewMessage('');
      });
  };

  return (
    <div className="chat-container">
      <div className="chat-log">
        {messages.map((m) => (
          <div key={m.id} className="chat-entry">{m.message}</div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="chat-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
