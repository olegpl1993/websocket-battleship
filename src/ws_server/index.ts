import WebSocket from 'ws';

export const server = new WebSocket.Server({ port: 3000 });

server.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('message', (message) => {
    console.log('Received message:', message);

    socket.send('Received your message');
  });

  socket.on('close', () => {
    console.log('WebSocket connection closed');
  });
});
