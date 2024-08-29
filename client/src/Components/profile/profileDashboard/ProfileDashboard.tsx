import React from 'react';
import { baseUrl } from '../../../config/baseUrl.config.ts'
export const ProfileDashboard = ({profile}) => {
    if (!profile) {
        return <div>No profile data available.</div>;
    }

    // console.log(baseUrl.API_BASE_URL)

    return (
        <>
            <h1>{profile.firstName} {profile.lastName}'s Profile</h1>
            <p>Description: {profile.description}</p>
            <img
                style={{height: '100px'}}
                src={`${baseUrl.API_BASE_URL}/uploads/${profile.avatarPath}`}
                alt={`${profile.firstName}'s avatar`}
            />
        </>
    );
}
