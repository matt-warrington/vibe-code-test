import React, { useEffect, useState } from 'react';

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
    </div>
  );
}

export default App;
