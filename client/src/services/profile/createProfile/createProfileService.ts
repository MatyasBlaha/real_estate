import axios from '../../axios.config.ts'

export const createProfile = async () => {
 try {

     const response = await axios.post('/api/profile/createProfile')

 } catch (error: any) {
     throw new Error('Could not create profile')
 }
}