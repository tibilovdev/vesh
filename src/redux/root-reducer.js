// это combine reducers из наших прошлых проектов. сюда будут попадать все редюсеры
import { combineReducers } from 'redux';

import { persistReducer } from 'redux-persist';

// storage это локал стораге 142 видео из библиотеки редух персист. это есть локал сторадж наш дефолтный браузерный но переработаный этой бибилотекой. т.е так мы получаем доступ к локал сторадж. мы можем так же экспортуть session storage
import storage from 'redux-persist/lib/storage';

import userReduser from './user/user.reducer';
import cartReduser from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
  key: ShadowRoot,
  storage,
  whitelist: ['cart'],
};

const rootReducer = combineReducers({
  user: userReduser,
  cart: cartReduser,
  directory: directoryReducer,
  shop: shopReducer,
});

export default persistReducer(persistConfig, rootReducer);
