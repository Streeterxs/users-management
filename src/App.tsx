import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css'

import './App.css';
import {Layout} from './Components/Layout';
import Routes from './Routes';
import { store } from './Store/Store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes/>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
