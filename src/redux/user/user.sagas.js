import { takeLatest, put, call, all } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
} from './user.actions';

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from '../../firebase/firebase.utils';

export function* getSnapShotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    console.log(user);
    yield getSnapShotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    console.log(user);
    yield getSnapShotFromUserAuth(user);
  } catch (error) {
    put(signInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapShotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    console.log(email);
    //Создает новую учетную запись пользователя, связанную с указанным адресом электронной почты и паролем. user это учетнаЯ запись
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    //console.log(user);
    //yield call(createUserProfileDocument, user, { displayName });
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapShotFromUserAuth(user, additionalData);
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}
export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}

//когда мы передаем в тейк латест или тейк еври функцию вторым аргументом, то в самой этой переданной функции в аргументах пропсом будет сидеть весь актион. и чтобы нам вытащить пейлоад из аргумента нужно ее дистрактнуть

//const { setCurrentUser } = this.props;
// console.log(this.props, 111111111);
// this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
//   if (userAuth) {
//     const userRef = await createUserProfileDocument(userAuth);
//     // console.log(userAuth, 'userAuth');
//     //так мы помещаем в наш стейт данные о пользователе из файрбейз
//     //onSnapshot это листнер который срабатывает тогда когда снапшот меняется. а он меняется в тот момент когда в делаем CRUD операции. в частности createUserProfileDocument мы создаем новую запись (userRef.set)
//     userRef.onSnapshot((snapShot) => {
//       //snapShot.data() это непосредственно данные из файрстор.
//       setCurrentUser({
//         id: snapShot.id,
//         ...snapShot.data(),
//       });
//     });
//   }
//   //тут  userAuth равняется null
//   else {
//     setCurrentUser(userAuth);
//   }
// });
