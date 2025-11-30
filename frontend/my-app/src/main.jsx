import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// frontend/src/index.jsx
//import React from 'react';
//import ReactDOM from 'react-dom/client';
//import App from './App';
//import './assets/styles/main.css';

//ReactDOM.createRoot(document.getElementById('root')).render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>
//);
