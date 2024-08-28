import axios from '../../axios.config.ts'

export const profileInformation = async (profileId) => {
    try {
        const response = await axios.get(`/api/profile/check/${profileId}`)
        console.log(response.data)
        return response.data.data
    } catch (error: any) {
        throw new Error('Could not fetch profile information')
    }
}