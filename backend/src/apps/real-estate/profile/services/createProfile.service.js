import {v4 as uuidv4} from "uuid";


const createProfile = async (userId, firstName, lastName, descriptionText) => {

    const profile = {
        id: uuidv4(),
        user_id: userId,
        first_name: firstName,
        last_name: lastName,
        description: descriptionText
    }

    return profile;
}

export default createProfile;