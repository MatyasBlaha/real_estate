import React, { createContext, useContext, useState, useEffect } from 'react';
import { ToastContainer, toast, TypeOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NotificationMessage {
    msg: string;
    type: TypeOptions;
}

const NotificationContext = createContext<(msg: string, type?: TypeOptions) => void>(() => {});

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider: React.FC = ({ children }) => {
    const [message, setMessage] = useState<NotificationMessage | null>(null);

    const notify = (msg: string, type: TypeOptions = 'success') => {
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
