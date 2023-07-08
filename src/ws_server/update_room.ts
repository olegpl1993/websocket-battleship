import { openRooms, users, waitingUsers } from './bd';
import { OpenRoomList } from './types';

export const update_room = () => {
  // формируем список открытых комнат
  const openRoomsList: OpenRoomList[] = [];
  openRooms.forEach((room, index) => {
    openRoomsList.push({
      roomId: index,
      roomUsers: [
        {
          name: room.name,
          index: users.findIndex((user) => user.name === room.name),
        },
      ],
    });
  });
  const openRoomsListStr = JSON.stringify(openRoomsList);
  const response = JSON.stringify({
    type: 'update_room',
    data: openRoomsListStr,
    id: 0,
  });

  // Отправляем список комнат всем в списке ожидающих
  waitingUsers.forEach((user) => {
    user.socket.send(response);
  });
};
