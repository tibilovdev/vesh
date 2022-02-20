import ShopActionTypes from './shop.types';

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';
//тут без пэйлоада т.к все что делает этот  актион просто свичит isFetching в инишал стейте редюсера

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

// у нас есть доступ к диспач бллагодаря thunk эьо тот же диспач что и в mapdispatchtoprops
// тут мы комбинируем несколько экшенов  и в шоп компонент мы передаем только fetchCollectionsStartAsunc
export const fetchCollectionsStartAsunc = () => {
  return (dispatch) => {
    const collectionRef = firestore.collection('collections');
    // это выше чем ком загрузки из файртора потому что, аока данныие из файрстора не прогурузятся этот код будет работать (is fetching = true)
    dispatch(fetchCollectionsStart());
    // collectionRef.get().then((snapshot) это способ вытаскивания данных из файрстора с помощью промисов
    collectionRef
      .get()
      .then((snapshot) => {
        // эта функция приводит данные вытащенные из файрстор в тот вид который нам нужен.(дополняет routeName для реактроутера )
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //console.log(collectionsMap);
        // тут мы обновляем наш редукс стор даннымми из файрбейса

        //когда данные из файрстор прогурязятся выполниться эттот диспач, т.к он ниже по коду 188
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
  };
};
