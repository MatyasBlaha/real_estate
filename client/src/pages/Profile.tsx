import {useEffect, useState} from "react";
import {handleProfileInformation} from "../services/profile/getProfile/handleProfileInformation.ts";
import {CreateProfileForm} from "../Components/profile/createProfileForm/CreateProfileForm.tsx";
import { ProfileDashboard } from '../Components/profile/ProfileDashboard.tsx'

const Profile = () => {
    const [profileData, setProfileData] = useState(null);


    useEffect(() => {
        handleProfileInformation().then((data) => {
            setProfileData(data);
        });
    }, []);

    if (!profileData) {
        return (
            <CreateProfileForm />
        )
    }

    return(
        <ProfileDashboard />
    )
}

export default Profile;