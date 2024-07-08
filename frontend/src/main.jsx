import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';

import ProtectedRoute from './Components/routes/ProtectedRoute';
import { store } from './store/store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(


  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
