import { register } from './registerService.ts';
import { Credentials, SetError } from "./registerTypes";

export const handleRegistration = async (credentials: Credentials, setError: SetError) => {
    try {
        const result = await register(credentials);

        console.log(result.statusCode)

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
