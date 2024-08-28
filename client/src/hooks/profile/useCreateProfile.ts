import { useNotification} from "../../context/NotificationContext.tsx";
import {handleCreateProfile} from "../../services/profile/createProfile/handleCreateProfile.ts";
import { ProfileCredentials } from "../../services/profile/createProfile/createProfileTypes.ts";
import { useNavigate } from "react-router-dom";

export const useCreateProfile = () => {
    const notify = useNotification()
    const navigate = useNavigate();

    const handleSubmit = async (profileCredentials: ProfileCredentials) => {
        try {
            const result = await handleCreateProfile(profileCredentials)
            console.log(result.id)

            if(result.type === 'success') {
                notify(result.message, 'success');
                setTimeout(() => {
                    navigate(`/profile/${result.id}`)
                }, 5500)
            } else {
                notify(result.message, 'error');
            }
        } catch (error: any) {
            notify(error.message, 'error');
        }
    }

    return {
        handleSubmit
    }
}