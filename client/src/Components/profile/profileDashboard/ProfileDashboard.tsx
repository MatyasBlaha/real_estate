import {ProfileHeading} from "./Heading/ProfileHeading.tsx";


export const ProfileDashboard = ({profile}) => {

    const firstName = profile.firstName;
    const lastName = profile.lastName
    const description = profile.description;
    const mobilePhone = profile.mobilePhone;

    return (
        <>
            <ProfileHeading firstName={firstName} />
            <p>{lastName}</p>
            <p>{description}</p>
            <p>{mobilePhone}</p>
        </>
    )
}