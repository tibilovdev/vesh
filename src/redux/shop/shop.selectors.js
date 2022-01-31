import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = (state) => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

// этот селектор нужен т.к у нас collections (посмотри в стейт и шоп дата) хранится в виде объекта значение
// export const selectShopCollectionsForPreview = createSelector(
//   [selectShopCollections],
//   (collections) => Object.keys(collections).map((key) => collections[key])
//);
export const selectShopCollectionsForPreview = createSelector(
  [selectShopCollections],
  (collections) => Object.values(collections)
);

// т.к в нашей базе данных индексы цифры , а нам нужно чтобы по параметру юрл нам доставалась из бд определенная колеция (у которых айд цифры, а параметр юрл строка), то мы пока наверху сделали объект который присваивает каждой категории цифру его айди (COLLECTION_ID_MAP) и далее мы тут в сселекторе ищем ту колекцию  у котрой айд равен  COLLECTION_ID_MAP[collectionUrlParam], где    COLLECTION_ID_MAP это наш обект наверху, а collectionUrlParam эьлстроковый праметр юрл из адресной строки браузера . и по факту  COLLECTION_ID_MAP[collectionUrlParam] нам выдает одну из цифр соответсвующих айди в базе данных. и если айди колекции из бд равен COLLECTION_ID_MAP[collectionUrlParam] то нам селектор выдает эту колекцию

// еще заметить что это карированнная функция(фунцияя возращающая другую функцию) поэтому в collection.component.jsx мы пищем selectCollection(ownProps.match.params.collectionId)(state) два раза ее вызываем ownProps.match.params.collectionId это collectionUrlParam, а state это уже как обычно с реселктом 148 видео

// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   womens: 4,
//   mens: 5,
// };

// export const selectCollection = memoize((collectionUrlParam) =>
//   createSelector([selectShopCollections], (collections) =>
//     collections.find(
//       (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
//     )
//   )
// );

export const selectCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectShopCollections],
    (collections) => collections[collectionUrlParam]
  )
);
