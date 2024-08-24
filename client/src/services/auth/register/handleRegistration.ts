import { register } from './registerService.ts';
import {Credentials, RegisterResult, SetError} from "./registerTypes";

export const handleRegistration = async (credentials: Credentials, setError: SetError): Promise<RegisterResult> => {
    try {
        const result = await register(credentials);

        if(result.statusCode == 409) {
            return { type: 'warning', message: result.message}
        }

        if (result.statusCode !== 200 && result.statusCode !== 201) {
            return { type: 'error', message: result.message };
        }

        return { type: 'success', message: result.message };
    } catch (error: any) {
        const errorMsg = error instanceof Error ? error.message : 'Registration failed';
        setError(errorMsg);
        return { type: 'error', message: errorMsg };
    }
};
