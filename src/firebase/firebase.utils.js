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
  //вытаскиваем определенную запись из файрстор
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  console.log(snapShot, '------------------', userRef);
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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
