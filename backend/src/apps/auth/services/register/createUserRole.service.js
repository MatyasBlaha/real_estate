

const createUserRole = async (user) => {

    const userId = user.id;

    const userRole = {
        user_id: userId
    }

    return userRole;
}

export default createUserRole;