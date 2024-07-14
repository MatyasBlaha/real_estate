import axios from '../axios.config';
import {logDOM} from "@testing-library/react";

export const login = async (credentials) => {
    try {
        const data = credentials;

        const result = await axios.post('/api/user/public/login', data);
        return result.data.data;
    } catch (err) {
        if(err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('An error occurred while logging in');
        }
    }
}