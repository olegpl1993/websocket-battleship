import { users } from './users';
import { ClientMessage, ServerRegistration, UserData } from './types';

export const reg = (messageObject: ClientMessage) => {
  const userData: UserData = JSON.parse(messageObject.data);

  // Проверка на существование пользователя
  const userExists = users.find((user) => user.name === userData.name);
  const isCorrectPassword = userExists?.password === userData.password;

  // если пользователь существует и пароль совпадает
  if (userExists && isCorrectPassword) {
    console.log(userData, 'User exists');
    const response: ServerRegistration = {
      type: 'reg',
      data: {
        name: userData.name,
        index: 1,
        error: false,
        errorText: '',
      },
      id: 0,
    };
    return response;
  }

  users.push(userData);
  console.log(userData, 'User added');
  const response: ServerRegistration = {
    type: 'reg',
    data: {
      name: userData.name,
      index: 1,
      error: false,
      errorText: '',
    },
    id: 0,
  };
  return response;
};
