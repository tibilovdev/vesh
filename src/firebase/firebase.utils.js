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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
