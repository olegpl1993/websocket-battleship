import { users, waitingUsers } from './bd';
import { ClientServerMessage, UserData } from './types';
import { WebSocket } from 'ws';
import { update_room } from './update_room';

export const reg = (clientMessage: ClientServerMessage, socket: WebSocket) => {
  const data: UserData = JSON.parse(clientMessage.data);

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
    // Добавляем пользователя в список ожидающих
    waitingUsers.push({
      name: data.name,
      socket,
    });
    update_room(); // Отправляем список комнат всем в списке ожидающих
  } else if (userExists && !isCorrectPassword) {
    // пароль не совпадает
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
    // пользователь не существует
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
    // Добавляем пользователя в список ожидающих
    waitingUsers.push({
      name: data.name,
      socket,
    });
    update_room(); // Отправляем список комнат всем в списке ожидающих
  }
};
