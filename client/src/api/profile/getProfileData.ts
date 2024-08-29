import axios from '../../config/axios.config.ts'

export const getProfileData = async (profileId) => {
    try {
        const response = await axios.get(`/api/profile/check/${profileId}`)
        return response.data.data
    } catch (error: any) {
        throw new Error('Could not fetch profile information')
    }
}