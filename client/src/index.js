import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App.tsx';
import { NotificationProvider } from "./context/global/NotificationContext.tsx";
import { UserContextProvider } from "./context/global/useUserContext.tsx";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
    <NotificationProvider>
        <UserContextProvider>
                <App />
        </UserContextProvider>
    </NotificationProvider>
</BrowserRouter>
);
