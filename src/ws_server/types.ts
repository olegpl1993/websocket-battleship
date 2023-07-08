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

export interface User {
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

export interface AddUserToRoomData {
  indexRoom: number;
}
