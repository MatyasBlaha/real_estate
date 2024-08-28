import {createProfile} from "./createProfileService.ts";
import {ProfileCredentials} from "./createProfileTypes";


export const handleCreateProfile = async (profileCredentials: ProfileCredentials) => {
    try {
        const response = await createProfile(profileCredentials)
        console.log(response)
        return { type:'success', message: 'Profile created successfully', id: response.data.id }
    } catch (error: any) {
        console.error('Error creating profile:', error);
        throw new Error(error)
    }
}