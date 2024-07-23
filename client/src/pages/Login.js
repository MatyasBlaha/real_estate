import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UserContext } from '../context/UserContext';
import LoginForm from '../Components/Auth/LoginForm';
import { getUsernameFromCookies } from "../utils/cookieUtils";
import { handleLogin } from '../services/auth/login/login.helper';

const Login = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        const username = getUsernameFromCookies();
        if (username) {
            setUser(username);
        }
    }, [setUser]);

    const handleSubmit = async (credentials) => {
        try {
            await handleLogin(credentials, setUser, navigate, setError);
            toast.success("Login successful!", { autoClose: 5000 });
        } catch (error) {
            setError(error.message);
            toast.error(error.message, { autoClose: 5000 });
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <LoginForm onSubmit={handleSubmit} />
            <ToastContainer />
        </div>
    );
};

export default Login;