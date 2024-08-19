import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {BrowserRouter} from 'react-router-dom';
import {NotificationProvider} from "./context/NotificationContext";


//Import global styles
import './styles/base/typography.css'
import './styles/base/reset.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <NotificationProvider>
            <App />
        </NotificationProvider>
    </BrowserRouter>
  </React.StrictMode>
);

