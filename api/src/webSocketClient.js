const { io } = require('socket.io-client');

// Conecte-se ao WebSocket
const socket = io('http://localhost:3000');  // Substitua pela URL correta

// Quando conectado ao servidor WebSocket
socket.on('connect', () => { 
    console.log('Connected to WebSocket server:', socket.id);
});

// Escute o evento 'receiveOrders' e processe os dados
socket.on('receiveOrders', (orderData) => {
    console.log('Received order data:', orderData);
});

// Desconecte-se quando terminar
socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server.');
});
