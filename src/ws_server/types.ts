export interface UserData {
  name: string;
  password: string;
}

export interface ClientMessage {
  type: 'reg';
  data: string;
  id: 0;
}

export interface ServerRegistration {
  type: 'reg';
  data: {
    name: string;
    index: number;
    error: boolean;
    errorText: string;
  };
  id: 0;
}
