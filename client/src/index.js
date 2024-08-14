import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {NotificationProvider} from "./context/NotificationContext";

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

