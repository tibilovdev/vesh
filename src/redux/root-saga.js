import { all, call } from 'redux-saga/effects';
import { fetchCollectionsStart } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';
import { cartSagas } from './cart/cart-sagas';

//все наши саги, чтобы их в стор.джс в run() не кидать по отдельности мы, пока предаем сюда, а потом rootSaga экспортим в стор.джс и кидаем в run
//all делает так что все закинутые в него саги работают одновременно паралельно, не дожидаясь исполнения предыдущих
export default function* rootSaga() {
  yield all([call(fetchCollectionsStart), call(userSagas), call(cartSagas)]);
}
