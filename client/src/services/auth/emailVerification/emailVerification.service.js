import axios from '../../axios.config'

export const  emailVerification = async (token) => {
    try {

        await axios.get(`/api/user/public/email/${token}`)
    } catch (err) {
        throw new Error('Could not verify email')
    }
}