import { ClientServerMessage } from './types';
import { WebSocket } from 'ws';

export const create_room = (
  ClientMessage: ClientServerMessage,
  socket: WebSocket,
) => {
  console.log('create_room', ClientMessage);
};
