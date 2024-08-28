import axios from '../../axios.config.ts'
import {ProfileCredentials} from "./createProfileTypes";

export const createProfile = async (profileCredentials: ProfileCredentials): Promise<any> => {
 try {

     const response = await axios.post('/api/profile/createProfile', profileCredentials)
     return response.data

 } catch (error: any) {
     throw new Error('Could not create profile')
 }
}