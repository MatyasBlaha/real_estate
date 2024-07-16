import axios from '../../axios.config';


export const login = async (credentials) => {
    try {
        const data = credentials;

        await axios.post('/api/user/public/login', data);

    } catch (err) {
        if(err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('An error occurred while logging in');
        }
    }
}