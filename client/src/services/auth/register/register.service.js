import axios from '../../axios.config'

export const register = async (credentials) => {
    try {
        const data = credentials;
        console.log(data);

        await axios.post('/api/user/public/register', data)
    } catch (err) {
        if(err.response) {
            throw new Error(err.response.data.message)
        } else {
            throw new Error('An error occurred while registering')
        }
    }
}