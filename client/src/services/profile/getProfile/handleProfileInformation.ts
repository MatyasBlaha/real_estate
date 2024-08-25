import {profileInformation} from "./profileInformationService.ts";
import { createProfile} from "../createProfile/createProfileService.ts";


export const handleProfileInformation = async () => {

    try{
        const response = await profileInformation();
        return response.data
    } catch (error: any) {
        console.error('Error fetching profile information:', error);
        throw new Error(error)
    }

}