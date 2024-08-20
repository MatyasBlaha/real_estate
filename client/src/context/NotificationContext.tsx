import React, { createContext, useContext, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';


const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [message, setMessage] = useState(null);

    const notify = (msg, type = 'success') => {
        setMessage({ msg, type });
    };

    useEffect(() => {
        if (message) {
            toast[message.type](message.msg, { autoClose: 5000 });
        }
    }, [message]);

    return (
        <NotificationContext.Provider value={notify}>
            {children}
            <ToastContainer />
        </NotificationContext.Provider>
    );
};
