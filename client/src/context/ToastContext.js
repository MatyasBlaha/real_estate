import { createContext, useReducer } from "react";
import { toastReducer } from '../reducers/Toast/toastReducer'

import ToastsContainer from "../Components/Toast/ToastContainer";

const initialState = {
    toasts: [],
};



export const ToastContext = createContext();

export const ToastContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(toastReducer, initialState)


    const success = (message) => {
        addToast("success", message);
    };

    const warning = (message) => {
        addToast("warning", message);
    };

    const info = (message) => {
        addToast("info", message);
    };

    const error = (message) => {
        addToast("error", message);
    };



    const addToast = (type, message) => {
        const id = Math.floor(Math.random() * 10000000);
        dispatch({ type: "ADD_TOAST", payload: { id, message, type } });
    };

    const remove = (id) => {
        dispatch({ type: "DELETE_TOAST", payload: id });
    };

    const value = { success, warning, info, error, remove };


    return (
        <ToastContext.Provider value={value}>
            <ToastsContainer toasts={state.toasts} />
            {children}
        </ToastContext.Provider>
    );
}