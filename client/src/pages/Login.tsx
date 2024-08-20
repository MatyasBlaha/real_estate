import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import { useUserContext } from '../context/useUserContext.tsx';
import 'react-toastify/dist/ReactToastify.css';

import LoginForm from '../Components/Auth/LoginForm.tsx';
import { getUsernameFromCookies } from '../utils/cookieUtils.ts';
import { useLogin } from "../hooks/auth/login/useLogin.ts";

import { Credentials } from "../services/auth/login/loginTypes";

const Login: React.FC = () => {

    const { login, error } = useLogin();

    useEffect(() => {
        const username = getUsernameFromCookies();
        if (username) {
            login({ username, password:'' })
        }
    }, [login]);


    return (
        <div>
            <h1>Login</h1>
            <LoginForm onSubmit={login} />
        </div>
    );
};

export default Login;
