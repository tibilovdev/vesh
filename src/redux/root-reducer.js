// это combine reducers из наших прошлых проектов сюда будут попадать все редюсеры

import { combineReducers } from 'redux';

import userReduser from './user/user.reducer';
import cartReduser from './cart/cart.reducer';

export default combineReducers({
  user: userReduser,
  cart: cartReduser,
});
