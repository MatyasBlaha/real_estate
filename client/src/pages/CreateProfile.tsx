import React from 'react';
import {CreateProfileForm} from "../Components/profile/createProfileForm/CreateProfileForm.tsx";
import {useCreateProfile} from "../hooks/profile/useCreateProfile.ts";
import {useUserContext} from "../context/useUserContext.tsx";

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