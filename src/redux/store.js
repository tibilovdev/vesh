import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootSaga from './root-saga';

import logger from 'redux-logger';
//import thunk from 'redux-thunk';

import rootReducer from './root-reducer';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, logger];

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

// эо устоийчивая версия стора сохраняемая в local storage
export const persistor = persistStore(store);

// export default { store, persistor };
