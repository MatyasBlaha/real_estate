import React from 'react';
import {CreateProfileForm} from "../Components/profile/createProfileForm/CreateProfileForm.tsx";
import { useCreateProfile } from "../services/profile/createProfile/useCreateProfile.ts";
import {useUserContext} from "../context/global/useUserContext.tsx";

const CreateProfile: React.FC = () => {
    const { user } = useUserContext();

    const {handleSubmit} = useCreateProfile();

    return (
        <>
            <CreateProfileForm onSubmit={handleSubmit} registeredName={user} />
        </>
    )
}

export default CreateProfile;