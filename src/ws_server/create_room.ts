import { openRoomUsers, waitingUsers } from './bd';
import { ClientServerMessage } from './types';
import { WebSocket } from 'ws';
import { update_room } from './update_room';

export const create_room = (
  clientMessage: ClientServerMessage,
  socket: WebSocket,
) => {
  const currentUser = waitingUsers.find((user) => user.socket === socket);

  if (currentUser) {
    // Удаляем пользователя из списка ожидающих
    // waitingUsers.splice(
    //   waitingUsers.findIndex((user) => user.name === currentUser.name),
    //   1,
    // );

    // Добавляем открыую комнату
    openRoomUsers.push({
      name: currentUser.name,
      socket,
    });
  }

  update_room(); // Отправляем список комнат всем в списке ожидающих
};
