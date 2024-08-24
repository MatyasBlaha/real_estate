import { login } from "./loginService.ts";
import { getUsernameFromCookies } from "../../../utils/cookieUtils.ts";
import { Credentials, SetUser, Navigate, SetError, LoginResult} from "./loginTypes";

export const handleLogin = async (
    credentials: Credentials,
    setUser: SetUser,
    navigate: Navigate,
    setError: SetError
): Promise<LoginResult> => {
    try {
        await login(credentials);

        const username = getUsernameFromCookies();

        if (!username) {
            const errorMsg = 'Failed to retrieve username from cookies';
            setError(errorMsg);
            return { type: 'error', message: errorMsg };
        }

        setUser(username);

        return { type: 'success', message: 'Login successful!' };

    } catch (error: any) {
        const errorMsg = error instanceof Error ? error.message : 'An error occurred while logging in';
        setError(errorMsg);
        return { type: 'error', message: errorMsg };
    }
};
