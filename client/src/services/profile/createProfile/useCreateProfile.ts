import { postCreateProfile} from "../../../api/profile/postCreateProfile.ts";
import { ProfileCredentials } from "../../../types/profile/profile.types.ts";
import { notify } from "../../../hooks/notificationHook.ts";
import { useNavigation } from '../../../hooks/navigationHook.ts'

export const useCreateProfile = () => {
    const { navigateTo } = useNavigation()

    const handleSubmit = async (profileCredentials: ProfileCredentials) => {
        try {
            const response = await postCreateProfile(profileCredentials);
            notify('Profile created successfully', 'success');
            await navigateTo(`/profile/${response.data.id}`)
        } catch (error: any) {
            notify(error.message, 'error');
        }
    };

    return { handleSubmit };
};