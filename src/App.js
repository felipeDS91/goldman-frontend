import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ModalProvider } from 'styled-react-modal';

import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';

import CompanyProvider from '~/context/Company';

import { store, persistor } from './store';

import GlobalStyle from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <CompanyProvider>
        <ModalProvider>
          <PersistGate persistor={persistor}>
            <Router history={history}>
              <Routes />

              <GlobalStyle />
            </Router>
          </PersistGate>
        </ModalProvider>
      </CompanyProvider>
    </Provider>
  );
}

export default App;
