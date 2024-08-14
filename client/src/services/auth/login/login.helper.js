import { login } from "./login.service";
import { getUsernameFromCookies } from "../../../utils/cookieUtils";


export const handleLogin = async (credentials, setUser, navigate, setError) => {
    try {
        await login(credentials);
        const username = getUsernameFromCookies();
        if (username) {
            setUser(username);
        }
        navigate('/home');
        return { type: 'success', message: 'Login successful!' };
    } catch (error) {
        setError(error.message);
        throw error
    }
};

