import axios from '../../axios.config.ts'

export const  emailVerification = async (token) => {
    try {
        const response = await axios.get(`/api/user/public/email/${token}`)
        return response.data
    } catch (err) {
        throw new Error('Could not verify email')
    }
}