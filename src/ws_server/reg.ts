import { users } from './users';
import { ClientServerMessage, UserData } from './types';
import { WebSocket } from 'ws';

export const reg = (ClientMessage: ClientServerMessage, socket: WebSocket) => {
  const data: UserData = JSON.parse(ClientMessage.data);

  const userExists = users.find((user) => user.name === data.name); // Проверка существования
  const isCorrectPassword = userExists?.password === data.password; // Проверка пароля
  const index = users.findIndex((user) => user.name === data.name); // Индекс пользователя

  if (userExists && isCorrectPassword) {
    // Если пользователь существует и пароль совпадает
    socket.send(
      JSON.stringify({
        type: 'reg',
        data: JSON.stringify({
          name: data.name,
          index,
          error: false,
          errorText: '',
        }),
        id: 0,
      }),
    );
  } else if (userExists && !isCorrectPassword) {
    // Если пользователь существует и пароль не совпадает
    socket.send(
      JSON.stringify({
        type: 'reg',
        data: JSON.stringify({
          name: data.name,
          index,
          error: true,
          errorText: 'Invalid password',
        }),
        id: 0,
      }),
    );
  } else {
    // Если пользователь не существует
    users.push(data); // Добавляем нового пользователя
    const newIndex = users.length - 1; // Индекс добавленного пользователя
    socket.send(
      JSON.stringify({
        type: 'reg',
        data: JSON.stringify({
          name: data.name,
          index: newIndex,
          error: false,
          errorText: '',
        }),
        id: 0,
      }),
    );
  }
};
