import { useNotification } from "../../../context/global/NotificationContext.tsx";
import { useState } from "react";
import { Credentials } from '../../../services/auth/register/registerTypes';
import { handleRegistration } from "../../../services/auth/register/handleRegistration.ts";

export const useRegistration = () => {
    const notify = useNotification();
    const [error, setError] = useState<string>('');

    const register = async (credentials: Credentials) => {
        try {
            const result = await handleRegistration(credentials, setError);

            if (result.type === 'success') {
                notify(result.message, 'success');
            } else if (result.type === 'warning') {
              notify(result.message, 'warning');
            } else {
                notify(result.message, 'error');
            }
        } catch (error: any) {
            setError(error.message);
            notify(error.message, 'error');
        }
    };

    return { register, error };
};
