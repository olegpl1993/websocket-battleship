export interface UserData {
  name: string;
  password: string;
}

export interface ClientServerMessage {
  type: 'reg';
  data: string;
  id: 0;
}

export interface RedistrationData {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
}
