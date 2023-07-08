import { users } from './users';
import { ClientServerMessage, UserData } from './types';

export const reg = (messageObject: ClientServerMessage) => {
  const userData: UserData = JSON.parse(messageObject.data);

  const userExists = users.find((user) => user.name === userData.name); // Проверка существования
  const isCorrectPassword = userExists?.password === userData.password; // Проверка пароля
  const index = users.findIndex((user) => user.name === userData.name); // Индекс пользователя

  // Если пользователь существует и пароль совпадает
  if (userExists && isCorrectPassword) {
    const objData = {
      name: userData.name,
      index,
      error: false,
      errorText: '',
    };
    return objData;
  }

  // Если пользователь существует и пароль не совпадает
  if (userExists && !isCorrectPassword) {
    const objData = {
      name: userData.name,
      index,
      error: true,
      errorText: 'Invalid password',
    };
    return objData;
  }

  // Если пользователь не существует
  users.push(userData); // Добавляем нового пользователя
  const newIndex = users.length - 1; // Индекс добавленного пользователя
  const objData = {
    name: userData.name,
    index: newIndex,
    error: false,
    errorText: '',
  };
  return objData;
};
