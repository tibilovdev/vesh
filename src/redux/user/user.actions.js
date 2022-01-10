import { userActionTypes } from './user.types';

//user тут будет наш объект о пользователе авторизаващийся через гугл или через форму

export const setCurrentUser = (user) => ({
  type: userActionTypes.SET_CURRENT_USER,
  payload: user,
});
