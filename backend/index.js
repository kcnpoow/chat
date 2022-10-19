const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

const ChatAPI = require('./api/Chat');

const PORT = 1111;
const DB_URI = 'mongodb://localhost:27017/chat-react';

const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/api/chat/room', ChatAPI.room);
app.get('/api/chat/rooms', ChatAPI.rooms);
app.post('/api/chat/room/create', ChatAPI.createRoom);
app.post('/api/chat/room/message/create', ChatAPI.createMessage);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:9999',
  }
});

io.on('connection', socket => {
  socket.on('room create', async (roomName) => {
    const response = await fetch('http://localhost:1111/api/chat/room/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: roomName })
    });

    const result = await response.json();

    if (result) {
      io.emit('room create', result);
    }
  });

  socket.on('room join', async (roomId) => {
    const url = `http://localhost:1111/api/chat/room?id=${roomId}`;
    const response = await fetch(url);
    const result = await response.json();

    if (result) {
      const roomName = `room=${roomId}`;
      socket.join(roomName);
      io.to(roomName).emit('room join', result);
    }
  });

  socket.on('room leave', (roomId) => {
    socket.leave(`room=${roomId}`);
  });

  socket.on('message', async (msg) => {
    const response = await fetch('http://localhost:1111/api/chat/room/message/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(msg)
    });

    if (response.ok) {
      io.to(`room=${msg.roomId}`).emit('message', msg);
    }
  });
});

mongoose.connect(DB_URI, () => {
  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
});