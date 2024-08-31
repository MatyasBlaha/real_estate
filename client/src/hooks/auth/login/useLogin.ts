// src/hooks/useLogin.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../../context/global/NotificationContext.tsx';
import { handleLogin } from '../../../services/auth/login/handleLogin.ts';
import {Credentials} from "../../../services/auth/login/loginTypes.ts";
import { useUserContext } from '../../../context/global/useUserContext.tsx';

export const useLogin = () => {
    const { setUser } = useUserContext();
    const navigate = useNavigate();
    const notify = useNotification();
    const [error, setError] = useState<string>('');

    const login = async (credentials: Credentials) => {
        try {
            const result = await handleLogin(credentials, setUser, navigate, setError);

            if (result.type === 'success') {
                notify(result.message, 'success');
                navigate('/');
            } else {
                notify(result.message, 'error');
            }
        } catch (error: any) {
            setError(error.message);
            notify(error.message, 'error');
        }
    };

    return { login, error };
};
