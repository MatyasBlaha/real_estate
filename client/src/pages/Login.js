import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

        } catch (error) {
            setError(error.message);

        }
    };

    return (
        <div>
            <h1>Login</h1>
            <LoginForm onSubmit={handleSubmit} />
        </div>
    );
};

export default Login;