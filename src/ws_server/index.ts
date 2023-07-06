import WebSocket from 'ws';
import { ClientMessage } from './types';
import { reg } from './reg';

const router = {
  reg,
};

export const server = new WebSocket.Server({ port: 3000 });

server.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('message', (message) => {
    const messageString = message.toString(); // Преобразование буфера в строку
    const messageObject: ClientMessage = JSON.parse(messageString);
    const action = router[messageObject.type];
    const response = action(messageObject);
    // Отправка сообщения
    socket.send(JSON.stringify(response));
  });

  socket.on('close', () => {
    console.log('WebSocket connection closed');
  });
});
