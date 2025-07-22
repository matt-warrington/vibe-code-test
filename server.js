const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const chatMessages = [];

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.get('/api/chat', (req, res) => {
  res.json(chatMessages);
});

app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  const entry = { id: Date.now(), message };
  chatMessages.push(entry);
  res.status(201).json(entry);
});

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
