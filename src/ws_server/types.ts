export interface LoginData {
  name: string;
  password: string;
}

export interface LoginMessage {
  type: 'reg';
  data: LoginData;
  id: 0;
}
