import WebSocket from 'ws';
import { ClientServerMessage } from './types';
import { reg } from './reg';

const actionList = {
  reg,
};

export const server = new WebSocket.Server({ port: 3000 });

server.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('message', (message) => {
    const messageString = message.toString(); // Преобразование буфера в строку
    const messageObject: ClientServerMessage = JSON.parse(messageString); // Преобразование строки в объект
    const action = actionList[messageObject.type]; // Выбор действия
    const dataObj = action(messageObject); // Вызов действия создающего обьект дата
    const data = JSON.stringify(dataObj); // Преобразование обьекта дата в строку
    // сообщение с ответом для клиента
    const response: ClientServerMessage = {
      type: messageObject.type,
      data,
      id: 0,
    };
    const stringResponse = JSON.stringify(response); // Преобразование ответа в строку
    socket.send(stringResponse); // Отправка ответа
  });

  socket.on('close', () => {
    console.log('WebSocket connection closed');
  });
});
