import Response from "../../shared/models/response.js";
import HttpStatus from "../../shared/utils/HttpStatus.utils.js";
import logger from '../../shared/log/logger.js'
import { createResponse } from "../../shared/utils/response.utils.js";


import validateRegisterInput from "../services/register/validateRegistrationInput.service.js";
import userRepository from "../repository/register.repository.js";
import sendVerificationEmail from "../services/email/sendVerificationEmail.service.js";

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Validate register input.
        const validationRegisterResult = validateRegisterInput(firstName, lastName, email, password);
        if(validationRegisterResult.error) {
            return res.status(validationRegisterResult.error.code).json(createResponse(validationRegisterResult.error.code, validationRegisterResult.error.status, validationRegisterResult.error.message, null));
        }

        // Check if user is already registered.
        const isUserAlreadyRegistered = await userRepository.checkIfUserAlreadyRegistered(email);
        if(isUserAlreadyRegistered) {

            // Check if user is already verified.
            if(isUserAlreadyRegistered.verified === 1){
                res.status(HttpStatus.OK.code).json(createResponse(HttpStatus.OK.code, HttpStatus.OK.status, 'User is already registered, login', null));
            } else {

                // If not verified, send verification email.
                const token = await userRepository.saveVerificationTokenToDatabase(isUserAlreadyRegistered);
                await sendVerificationEmail(email, token)
            }
        } else {

            // Create a new registration.
            const user = await userRepository.saveUserToDatabase(firstName, lastName, email, password);
            await userRepository.saveUserRoleToDatabase(user);
            const token = await userRepository.saveVerificationTokenToDatabase(isUserAlreadyRegistered);
            await sendVerificationEmail(email, token);
            res.status(HttpStatus.CREATED.code).json(createResponse(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'createUser created successfully', user));
        }


    } catch (err) {
        logger.error({ error: err.message })
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json(createResponse(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Internal Server Error', null));
    }
}