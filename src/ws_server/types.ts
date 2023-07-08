import { WebSocket } from 'ws';

export interface UserData {
  name: string;
  password: string;
}

export interface ClientServerMessage {
  type: 'reg';
  data: string;
  id: 0;
}

export interface OpenRoom {
  name: string;
  socket: WebSocket;
}

export interface WaitingUser {
  name: string;
  socket: WebSocket;
}

export interface OpenRoomList {
  roomId: number;
  roomUsers: [
    {
      name: string;
      index: number;
    },
  ];
}
