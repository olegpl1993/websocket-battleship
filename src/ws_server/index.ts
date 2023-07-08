import WebSocket from 'ws';
import { ClientServerMessage } from './types';
import { reg } from './reg';

const actionList = {
  reg,
};

export const server = new WebSocket.Server({ port: 3000 });

server.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('message', (request) => {
    const requestString = request.toString(); // Преобразование буфера в строку
    const ClientMessage: ClientServerMessage = JSON.parse(requestString); // Преобразование строки в объект
    const action = actionList[ClientMessage.type]; // Выбор действия
    const dataObj = action(ClientMessage); // data для ответа
    const data = JSON.stringify(dataObj); // data в строку
    // ответ для клиента
    const ServerMessage: ClientServerMessage = {
      type: ClientMessage.type,
      data,
      id: 0,
    };
    const response = JSON.stringify(ServerMessage); // ответ в строку
    socket.send(response); // Отправка ответа
  });

  socket.on('close', () => {
    console.log('WebSocket connection closed');
  });
});
