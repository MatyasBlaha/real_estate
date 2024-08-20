import {logout} from "./logout.service.ts";
import {useEffect} from "react";
import {getUsernameFromCookies} from "../../../utils/cookieUtils.ts";


interface HandleLogoutProps {
    navigate: (path: string) => void;
    setUser: (path: string | null) => void;
}


const handleLogout = async ({navigate, setUser}: HandleLogoutProps) => {
    try {
        await logout()
        const username = getUsernameFromCookies();
        if(!username) {
            setUser(null);
            navigate('/');
        }
    } catch (err) {
        console.error('Error occurred while logging out:', err.message);
    }
};

export {handleLogout}