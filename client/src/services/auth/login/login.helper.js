import {login} from "./login.service";
import {getUsernameFromCookies} from "../../../utils/cookieUtils";

const handleLogin = async (credentials, setUser, navigate) => {
    try {
        await login(credentials);
        const username = getUsernameFromCookies();
        if (username) {
            setUser(username);
        }
        navigate('/home');
    } catch (error) {
        console.error('Invalid credentials:', error);
        throw new Error('Invalid credentials');
    }
};

export { handleLogin }