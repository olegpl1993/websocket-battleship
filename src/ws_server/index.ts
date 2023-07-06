import WebSocket from 'ws';
import { LoginData } from './types';

export const server = new WebSocket.Server({ port: 3000 });

server.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('message', (message) => {
    const messageString = message.toString(); // Преобразование буфера в строку
    const messageObject = JSON.parse(messageString); // Распарсивание строки как JSON
    console.log('Received message:', messageObject);
    const parsedData: LoginData = JSON.parse(messageObject.data);
    console.log(parsedData);

    socket.send('Received your message');
  });

  socket.on('close', () => {
    console.log('WebSocket connection closed');
  });
});
