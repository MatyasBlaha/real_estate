import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {getProfileData} from '../../../api/profile/getProfileData.ts'

export const UseProfileData = () => {
    const [profileData, setProfileData] = useState(null);
    const { profileId } = useParams<{ profileId: string }>();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const data = await getProfileData(profileId);
                setProfileData(data);
            } catch (error) {
                setProfileData(null);
            }
        };

        fetchProfileData();
    }, [profileId]);

    return profileData;
}
