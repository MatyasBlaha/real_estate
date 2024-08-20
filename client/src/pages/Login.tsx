import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

import LoginForm from '../Components/Auth/LoginForm.tsx';
import { useLogin } from "../hooks/auth/login/useLogin.ts";


const Login: React.FC = () => {

    const { login } = useLogin();

    return (
        <div>
            <h1>Login</h1>
            <LoginForm onSubmit={login} />
        </div>
    );
};

export default Login;
