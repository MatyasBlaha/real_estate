import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";

import insertRecord from "../../../../../../query/insertRecord.query.js";

const createUser = async (email, password) => {

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = {
        id: uuidv4(),
        email: email,
        password: hashedPassword,
    }

    const user_role = {
        user_id: user.id
    }

    await insertRecord('users', user)
    await insertRecord('user_roles', user_role)

    return user;
}

export default createUser;