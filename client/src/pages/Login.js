import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth/loginService';
import { UserContext } from '../context/UserContext';
import LoginForm from '../Components/Auth/LoginForm';

const Login = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (credentials) => {
        try {
            const user = await login(credentials);
            console.log(user)
            setUser(user);
            navigate('/home')
        } catch (error) {
            throw new Error('Invalid credentials');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <LoginForm onSubmit={handleLogin} />
        </div>
    );
};

export default Login;
