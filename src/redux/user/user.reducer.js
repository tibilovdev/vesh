import UserActionTypes from './user.types';
const INITIAL_STATE = {
  currentUser: null,
  error: null,
};

const userReduser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      //case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReduser;

// в case UserActionTypes._SIGN_IN_SUCCESS: мы error: null, на случай если у нас пока была бы ошибка и сработал бы редюсер SIGN_IN_FAILURE: и следовательно в error встола бы ошибка, а потом у нас все прошло успешно и сработал  SIGN_IN_SUCCESS, то мы хотим чтобы еrror опять сидел null

// d редюсерах не пишутся типы с стартом. они нужны только для саг
