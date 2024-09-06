// server/server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// Initialize the app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());

// Store connected clients and messages
let messages = [];

// Handle socket connection
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Send message history to newly connected client
    socket.emit('chatHistory', messages);

    // Listen for new messages
    socket.on('sendMessage', (data) => {
        messages.push(data);
        io.emit('receiveMessage', data); // Broadcast to all clients
    });

    // Disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
