import {useNavigate} from "react-router-dom";

export const useNavigation = () => {
    const navigate = useNavigate();

    const navigateTo = (url: string) => {
        navigate(url, { replace: true });
    };

    return { navigateTo }
}