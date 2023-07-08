import WebSocket from 'ws';
import { ClientServerMessage } from './types';
import { reg } from './reg';
import { create_room } from './create_room';
import { add_user_to_room } from './add_user_to_room';

const actionList = {
  reg,
  create_room,
  add_user_to_room,
};

export const server = new WebSocket.Server({ port: 3000 });

server.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('message', (request) => {
    const requestString = request.toString(); // Преобразование буфера в строку
    const clientMessage: ClientServerMessage = JSON.parse(requestString); // Преобразование строки в объект
    const action = actionList[clientMessage.type]; // Выбор действия
    action(clientMessage, socket); // Вызов действия
  });

  socket.on('close', () => {
    console.log('WebSocket connection closed');
  });
});
