import { ClientServerMessage } from './types';
import { WebSocket } from 'ws';

export const create_room = (
  ClientMessage: ClientServerMessage,
  socket: WebSocket,
) => {
  const roomUser = {
    name: 'test1',
    index: 0,
  };

  const roomStr = JSON.stringify({
    roomId: 0,
    roomUsers: [roomUser],
  });

  const response = JSON.stringify({
    type: 'update_room',
    data: [roomStr],
    id: 0,
  });

  socket.send(response);
};
