import axios from '../../axios.config.ts';
import { Credentials } from "../login/loginTypes";

export const register = async (credentials: Credentials): Promise<any> => {
    try {
        const response = await axios.post('/api/user/public/register', credentials);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('An error occurred while registering');
        }
    }
};
