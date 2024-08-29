import axios from '../../../config/axios.config.ts';
import { Credentials } from "./loginTypes";

export const login = async (credentials: Credentials): Promise<void> => {
    try {
        await axios.post('/api/user/public/login', credentials);
    } catch (err: any) {
        if (err.response && err.response.data && err.response.data.message) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('An error occurred while logging in');
        }
    }
};
