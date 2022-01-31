import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
// эо устоийчивая версия стора сохраняемая в local storage
export const persistor = persistStore(store);

// export default { store, persistor };
