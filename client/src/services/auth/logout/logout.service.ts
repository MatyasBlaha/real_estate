import axios from '../../../config/axios.config.ts';

export const logout = async () => {
    try {
        await axios.post('/api/user/protected/logout')
    } catch (err) {
        if(err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('An error occurred while logging out');
        }
    }
}