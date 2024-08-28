import React, {useEffect, useState} from "react";
import {handleProfileInformation} from "../services/profile/getProfile/handleProfileInformation.ts";
import { ProfileDashboard } from '../Components/profile/profileDashboard/ProfileDashboard.tsx'
import { useUserContext} from "../context/useUserContext.tsx";
import {useParams} from "react-router-dom";

const Profile: React.FC = () => {
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading]: boolean = useState(true)
    const { user } = useUserContext();

    const { profileId} = useParams<{ userId: string}>();

    useEffect(() => {

        handleProfileInformation(profileId).then((data) => {
            setProfileData(data);
            console.log(data)
        }). catch(() => {
            setProfileData(null);
        }). finally(() => {
            setIsLoading(false)
        })
    }, []);


    if (isLoading) {
        return (
            <>
            </>
        )
    }

    return(
        <ProfileDashboard profile={profileData} />
    )
}

export default Profile;