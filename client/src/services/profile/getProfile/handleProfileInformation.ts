import {profileInformation} from "./profileInformationService.ts";
import { createProfile} from "../createProfile/createProfileService.ts";


export const handleProfileInformation = async (profileId) => {

    try{
        const response = await profileInformation(profileId);
        return response
    } catch (error: any) {
        console.error('Error fetching profile information:', error);
        throw new Error(error)
    }

}