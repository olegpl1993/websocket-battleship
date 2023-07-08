import { gameRooms, openRoomUsers, waitingUsers } from './bd';
import { AddUserToRoomData, ClientServerMessage } from './types';
import { WebSocket } from 'ws';
import { update_room } from './update_room';

export const add_user_to_room = (
  clientMessage: ClientServerMessage,
  socket: WebSocket,
) => {
  const currentUser = waitingUsers.find((user) => user.socket === socket); // текущий пользователь
  const data: AddUserToRoomData = JSON.parse(clientMessage.data);
  const { indexRoom } = data; // Индекс выбранной комнаты
  const openRoomUser = openRoomUsers[indexRoom]; // пользователь который открыл комнату

  if (currentUser) {
    const gameRoom = [openRoomUser, currentUser]; // создаем новую игровую комнату
    gameRooms.push(gameRoom); // Добавляем новую игровую комнату
    console.log('gameRoom', gameRoom);

    // Удаляем пользователей из списка ожидающих
    waitingUsers.splice(
      waitingUsers.findIndex((user) => user.name === currentUser.name),
      1,
    );
    waitingUsers.splice(
      waitingUsers.findIndex((user) => user.name === openRoomUser.name),
      1,
    );

    // Удаляем пользователя из списка открывших комнату
    openRoomUsers.splice(
      openRoomUsers.findIndex((user) => user.name === openRoomUser.name),
      1,
    );
  }

  update_room(); // Отправляем список комнат всем в списке ожидающих
};
