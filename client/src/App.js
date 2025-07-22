import React, { useEffect, useState } from 'react';
import Chat from './Chat';
import './Chat.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/message')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Error fetching message'));
  }, []);

  return (
    <div>
      <h1>React + Node</h1>
      <p>{message}</p>
      <Chat />
    </div>
  );
}

export default App;
