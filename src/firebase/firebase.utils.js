import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: 'AIzaSyCcMUQ8iv2KOdiHkWkOJDIk7zutVQrX3xU',
  authDomain: 'vesh-db.firebaseapp.com',
  projectId: 'vesh-db',
  storageBucket: 'vesh-db.appspot.com',
  messagingSenderId: '822208956370',
  appId: '1:822208956370:web:fc25eaf9a4921727f92a0b',
};

//создание записи в firestore.

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  //вытаскиваем определенную референс записи(документ) из файрстор
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // firebase всегда возвращает snapshot объект, даже если (`users/${userAuth.uid} такой записи не существует

  const snapShot = await userRef.get();
  //console.log(snapShot, '------------------', userRef);
  // snapshot это объект о записи, в которой есть параметр exists, которая говорит о том сушествует ли запись или нет  в базе данных
  if (!snapShot.exists) {
    // если такой записи не существует, то мы ее создаем, предварительно вытащив из обьекта авторизации  пользователя данные которые нам нужны
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // await userRef.set создаем запись в firestore
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error('error creating user', error.message);
    }
  }

  return userRef;
};

// c помощью этой функции мы добавляем в файрбейс колекции и документы
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);
  //batch нужен для того чтобы выгрузить все данные. и чтобы не было вероятности что какие то данные не выгурзятся
  const batch = firestore.batch();
  //мы проходимся по нашему массиву и для каждого значкения делаем дела
  objectsToAdd.forEach((obj) => {
    //  newDocRef = collectionRef.doc(); вохзращает нам рефы с рандомными id. если в doc() закинуть аргументом что то то оно и будет ид. на каждой итерации форича вернется один новый реф объект
    const newDocRef = collectionRef.doc();
    console.log(newDocRef);
    // мы сетим на адресе\пути\айди\рефе newDocRef наш один элемент (obj)из objectsToAdd
    batch.set(newDocRef, obj);
  });
  // batch.commit(); возращает промис с воидом нулом.
  return await batch.commit();
};

firebase.initializeApp(config);

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    // т.к в снапшоте в файрбекйсе у нас не все данные которые нам нужны, мы их в приложении нашем их дополняем  routeName: encodeURI(title.toLowerCase()), и далее уже этот обновленный массив с объектами (в которых мы чуть дополнили содержимое этих объектов идет вниз в ретерн и превращается в объект с помощью редюса transformedCollection.reduce((accum, collection) => ) это нам нужно чтобы сделать нормализацию данных (т.к selectShopCollectionsForPreview ожидают объект а не массив)
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  console.log('---------------', transformedCollection);
  // так мы массив переводим в объект 180 видео
  return transformedCollection.reduce((accum, collection) => {
    accum[collection.title.toLowerCase()] = collection;
    return accum;
  }, {});
};
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
