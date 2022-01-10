// это combine reducers из наших прошлых проектов сюда будут попадать все редюсеры

import { combineReducers } from 'redux';

import userReduser from './user/user.reducer';

export default combineReducers({
  user: userReduser,
});
