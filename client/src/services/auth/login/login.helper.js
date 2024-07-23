import { login } from "./login.service";
import { getUsernameFromCookies } from "../../../utils/cookieUtils";

const handleLogin = async (credentials, setUser, navigate, setError) => {
    try {
        await login(credentials);
        const username = getUsernameFromCookies();
        if (username) {
            setUser(username);
        }
        navigate('/home');
    } catch (error) {
        setError(error.message);
        throw error;
    }
};

export { handleLogin };
