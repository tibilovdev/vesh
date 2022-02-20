import { all, call, takeLatest, put } from 'redux-saga/effects';

import UserActionTypes from '../user/user.types';
import { clearCart } from './cart.actions';

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}

//тут сага слушает когда юзер выйлет из профиля SIGN_OUT_SUCCESS и как только он выйдет сработает clearCartOnSignOut с актионом  put(clearCart()); внутри, который затригерит редюсер(который очистит нашу корзину)
