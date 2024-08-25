import axios from '../../axios.config.ts'

export const profileInformation = async () => {
    try {
        const response = await axios.get('/api/profile/getProfile')
        return response.data
    } catch (error: any) {
        throw new Error('Could not fetch profile information')
    }
}