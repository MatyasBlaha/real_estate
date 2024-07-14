// register.repository.js
import checkRecordExists from "../../shared/queries/checkRecordExists.query.js";
import insertRecord from "../../shared/queries/insertRecord.query.js";
import deleteRecord from '../../shared/queries/deleteRecord.query.js'

import createUser from "../services/register/createUser.service.js";
import createUserRole from "../services/register/createUserRole.service.js";
import createVerificationToken from "../services/register/createVerificationToken.service.js";

const userRepository = {
    async checkIfUserAlreadyRegistered(email) {
        try {
            const tableName = 'users';
            const column = 'email';
            const data = email

            const user = await checkRecordExists(tableName, column, data);
            return user;
        } catch (err) {
            throw new Error(`Error checking if user already registered: ${err.message}`);
        }
    },

    async saveUserToDatabase(firstName, lastName, email, password) {
        try {
            const user = await createUser(firstName, lastName, email, password);
            const tableName = 'users';
            const data = user;

            await insertRecord(tableName, data);
            return user;
        } catch (err) {
            throw new Error(`Error saving user to database: ${err.message}`);
        }
    },

    async saveUserRoleToDatabase(user) {
        try {
            const userRole = createUserRole(user);
            const tableName = 'user_roles';

            await insertRecord(tableName, userRole);
        } catch (err) {
            throw new Error(`Error saving user role to database: ${err.message}`);
        }
    },


    async saveVerificationTokenToDatabase(user) {
        try {
            const tableName = 'user_verification_tokens';
            const column = 'user_id';
            const data = user.id

            const existingToken = await checkRecordExists(tableName, column, data)

            if(existingToken){
                await removeExpiredToken(user.id);
            }

            const verificationToken = createVerificationToken(user)
            await insertRecord(tableName, verificationToken);

            return verificationToken;

        } catch (err) {
            throw new Error(`Error saving verification token to database: ${err.message}`);
        }
    },
};

export const removeExpiredToken = async (user) => {
    try {
        const tableName = 'user_verification_tokens';
        const column = 'user_id';
        const data = user.id

        await deleteRecord(tableName, column, data);
    } catch (err) {
        throw new Error(`Error removing expired token: ${err.message}`);

    }
}

export default userRepository;