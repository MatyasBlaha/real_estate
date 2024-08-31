import React from "react";
import { ProfileDashboard } from '../Components/profile/profileDashboard/ProfileDashboard.tsx'
import { UseProfileData } from "../services/profile/getProfileData/useProfileData.ts";

const Profile: React.FC = () => {

    const { profileData, loading } = UseProfileData();

    if (loading) {
        return null
    }

    return(
        <ProfileDashboard profile={profileData} />
    )
}

export default Profile;