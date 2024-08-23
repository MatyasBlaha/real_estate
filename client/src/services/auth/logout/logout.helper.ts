import { logout } from "./logout.service.ts";
import { getUsernameFromCookies } from "../../../utils/cookieUtils.ts";
import { SetError } from '../login/loginTypes'

interface HandleLogoutProps {
    navigate: (path: string) => void;
    setUser: (path: string | null) => void;
}

const handleLogout = async (
    setError: SetError | null,
    { navigate, setUser }: HandleLogoutProps
): Promise<{ type: string; message: string }> => {
    try {
        await logout();
        const username = getUsernameFromCookies();

        if (!username) {
            setUser(null);
            const errorMsg = 'Logged out successfully!';
            return { type: 'success', message: errorMsg };
        }

        const errorMsg = 'Failed to log out';
        setError(errorMsg);
        return { type: 'error', message: errorMsg };

    } catch (err) {
        console.error('Error occurred while logging out:', err.message);
        return { type: 'error', message: 'An error occurred during logout' };
    }
};

export { handleLogout }
