import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";


const createUser = async (firstName, lastName, country, phoneNumber, email, password) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log(phoneNumber)

    const user = {
        id: uuidv4(),
        first_name: firstName,
        last_name: lastName,
        country: country,
        phone_number: phoneNumber,
        email: email,
        password: hashedPassword,
    }

    return user;
}

export default createUser;