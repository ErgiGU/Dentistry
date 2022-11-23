import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'

import './index.css';
import App from './App';
import reportWebVitals from '../src/tests/reportWebVitals';
import React from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </React.StrictMode>
);