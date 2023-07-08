export interface UserData {
  name: string;
  password: string;
}

export interface ClientServerMessage {
  type: 'reg';
  data: string;
  id: 0;
}
