// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the "public" directory
app.use(express.static(__dirname + '/public'));

// Listen to incoming connections
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
// server.js
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (message) => {
    // Broadcast the received message to all connected clients
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
