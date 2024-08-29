import axios from '../../config/axios.config.ts'
import {ProfileCredentials} from "../../types/profile/profile.types";

export const postCreateProfile = async (profileCredentials: ProfileCredentials): Promise<any> => {
    try {
        console.log(profileCredentials)

        const response = await axios.post('/api/profile/createProfile', profileCredentials)
        return response.data

    } catch (error: any) {
        throw new Error('Could not create profile')
    }
}