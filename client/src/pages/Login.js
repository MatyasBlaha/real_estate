import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/UserContext';

import LoginForm from '../Components/Auth/LoginForm';

import {getUsernameFromCookies} from "../utils/cookieUtils";
import { handleLogin } from '../services/auth/login/login.helper';

const Login = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const username = getUsernameFromCookies();
        if (username) {
            setUser(username);
        }
    }, []);

    const handleSubmit = async (credentials) => {
        await handleLogin(credentials, setUser, navigate); // pass setUser and navigate as arguments
    };

    return (
        <div>
            <h1>Login</h1>
            <LoginForm onSubmit={handleSubmit} />
        </div>
    );
};

export default Login;
