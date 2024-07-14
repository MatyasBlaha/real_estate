import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";


const createUser = async (firstName, lastName, email, password) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
        id: uuidv4(),
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: hashedPassword,
    }

    return user;
}

export default createUser;