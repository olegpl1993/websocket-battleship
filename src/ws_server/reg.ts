import { users } from './users';
import { ClientServerMessage, UserData } from './types';

export const reg = (ClientMessage: ClientServerMessage) => {
  const data: UserData = JSON.parse(ClientMessage.data);

  const userExists = users.find((user) => user.name === data.name); // Проверка существования
  const isCorrectPassword = userExists?.password === data.password; // Проверка пароля
  const index = users.findIndex((user) => user.name === data.name); // Индекс пользователя

  // Если пользователь существует и пароль совпадает
  if (userExists && isCorrectPassword) {
    const responseData = {
      name: data.name,
      index,
      error: false,
      errorText: '',
    };
    return responseData;
  }

  // Если пользователь существует и пароль не совпадает
  if (userExists && !isCorrectPassword) {
    const responseData = {
      name: data.name,
      index,
      error: true,
      errorText: 'Invalid password',
    };
    return responseData;
  }

  // Если пользователь не существует
  users.push(data); // Добавляем нового пользователя
  const newIndex = users.length - 1; // Индекс добавленного пользователя
  const responseData = {
    name: data.name,
    index: newIndex,
    error: false,
    errorText: '',
  };
  return responseData;
};
