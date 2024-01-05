import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import BaseApp from './BaseApp';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* ログイン、非ログインで切り分け */}  
      <BaseApp />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
