import WebSocket from 'ws';
import { ClientServerMessage } from './types';
import { reg } from './reg';
import { create_room } from './create_room';

const actionList = {
  reg,
  create_room,
};

export const server = new WebSocket.Server({ port: 3000 });

server.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('message', (request) => {
    const requestString = request.toString(); // Преобразование буфера в строку
    const ClientMessage: ClientServerMessage = JSON.parse(requestString); // Преобразование строки в объект
    const action = actionList[ClientMessage.type]; // Выбор действия
    action(ClientMessage, socket); // Вызов действия
  });

  socket.on('close', () => {
    console.log('WebSocket connection closed');
  });
});
