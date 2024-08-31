import {useState} from "react";
import {useNotification} from "../../../context/global/NotificationContext.tsx";

import { handleEmailVerification } from "../../../services/auth/emailVerification/handleEmailVerification.ts";


export const useEmailVerification = () => {
    const notify = useNotification()
    const [error, setError] = useState<string>('')

    const verifyEmail = async (token: string) => {
        try {
            const result = await handleEmailVerification(token, setError)

            if(result.type === 'success') {
                notify(result.message, 'success');
            } else {
                notify(result.message, 'error');
            }

        } catch (error: any) {
            setError(error.message)
            notify(error.message, 'error')
        }
    };

    return {verifyEmail, error}
 }