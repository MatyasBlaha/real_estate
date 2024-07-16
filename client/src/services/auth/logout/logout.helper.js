import {logout} from "./logout.service";
import {useEffect} from "react";
import {getUsernameFromCookies} from "../../../utils/cookieUtils";



const handleLogout = async (navigate, setUser) => {
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