import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';
import App from './App';

import { store, persistor } from './redux/store';
//  <PersistGate persistor={persistor}> так мы делаем чтобы наше приложение стало устоийчивым (сохраняем данные из стора в local storage 142)
//кидая в провидер стор, мы делаем его доступным по всему приложению
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
