// register.repository.js
import checkRecordExists from "../../shared/queries/checkRecordExists.query.js";
import insertRecord from "../../shared/queries/insertRecord.query.js";
import deleteExpiredTokenRecord from "../queries/register/deleteExpiredTokenRecord.js";

import createUser from "../services/register/createUser.service.js";
import createVerificationToken from "../services/register/createVerificationToken.service.js";
import {sendErrorResponse} from "../../shared/utils/http/handleHttpStatus/sendHttpResponse.js";

import HttpStatus from '../../shared/utils/http/HttpStatus.utils.ts'

const messages = {
    userAlreadyRegistered: 'User already registered',
}

const userRepository = {
    async checkIfUserAlreadyRegistered(res, email) {
        try {
            const tableName = 'users';
            const column = 'email';
            const data = email

            const user = await checkRecordExists(tableName, column, data);
            if (user) {
                return user;
            }
        } catch (err) {
            sendErrorResponse(res, HttpStatus.CONFLICT.code, HttpStatus.CONFLICT.status, messages.userAlreadyRegistered)
            return false
        }
    },

    async saveUserToDatabase(firstName, lastName, country, phoneNumber, email, password) {
        try {
            const user = await createUser(firstName, lastName, country, phoneNumber, email, password);
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
            const tableName = 'user_roles';
            const userRole = {
                user_id: user.id,
            };

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

export const removeExpiredToken = async (userId) => {
    try {
        const tableName = 'user_verification_tokens';
        const data = userId;
        const time = new Date();

        await deleteExpiredTokenRecord(tableName, data, time);
    } catch (err) {
        throw new Error(`Error removing expired token: ${err.message}`);

    }
};

export default userRepository;