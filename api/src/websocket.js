const { Server } = require('socket.io');

let io; 

const initializeWebSocket = (server) => {
    io = new Server(server); 

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    console.log('WebSocket initialized.');
};

const getWebSocketInstance = () => {
    if (!io) {
        throw new Error('WebSocket has not been initialized.');
    }
    return io;
};

module.exports = { initializeWebSocket, getWebSocketInstance };
