import { handleLogout } from "../../../services/auth/logout/logout.helper.ts";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/useUserContext.tsx";

import 'react-toastify/dist/ReactToastify.css';

import { useNotification } from "../../../context/NotificationContext.tsx";

export const useLogout = () => {
    const { setUser } = useUserContext();
    const navigate = useNavigate();
    const notify = useNotification();

    const handleLogoutClick = async () => {
        try {
            const result = await handleLogout(null, { navigate, setUser });

            if (result.type === 'success') {
                notify(result.message, 'success');
                navigate('/login');
            } else {
                notify(result.message, 'error');
            }

        } catch (err) {
            console.error('Error occurred while logging out:', err.message);
        }
    };

    return { handleLogoutClick }; // Return the function
};
