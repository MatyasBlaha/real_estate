import { Request, Response as ExpressResponse } from "express"
import Response from "../../shared/models/response.js";
import HttpStatus from "../../shared/utils/http/HttpStatus.utils.ts";
import logger from '../../shared/log/logger.js'
import { createResponse } from "../../shared/utils/response.utils.ts";


import validateRegisterInput from "../services/register/validateRegistrationInput.service.js";
import userRepository from "../repository/register.repository.js";
import sendVerificationEmail from "../services/email/sendVerificationEmail.service.js";
import {sendErrorResponse, sendSuccessResponse} from "../../shared/utils/http/handleHttpStatus/sendHttpResponse";
import {handleInternalServerError} from "../../shared/utils/http/handleHttpStatus/handleInternalServerError";

import { User } from '../interfaces/User.interface'


const messages={
    alreadyRegistered: "User is already registered",
    userCreated: "User created successfully",
    internalServerError: "Internal server error"
}

interface RegisterRequestBody {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}


export const register = async (req: Request<{}, {}, RegisterRequestBody>, res: ExpressResponse): Promise<ExpressResponse> => {
        try {
            const { firstName, lastName, email, password } = req.body;

            if (! await validateRegisterRequest(res, firstName, lastName, email, password)) return;

            const existingUser = await isUserAlreadyRegisteredRequest(res, email);

            if (! await isUserVerifiedRequest(res, existingUser)) return;

            await createUserRequest(res, firstName, lastName, email, password);


        } catch (error: any) {
            return handleInternalServerError(res, error);
        }
};


const validateRegisterRequest = async (res: ExpressResponse, firstName: string, lastName: string, email: string, password: string): Promise<boolean> => {
    const validationRegisterResult = validateRegisterInput(firstName, lastName, email, password);
    if(validationRegisterResult.error) {
        sendErrorResponse(res, validationRegisterResult.error.code, validationRegisterResult.error.status, validationRegisterResult.error.message);
        return Promise.resolve(false);
    }
    return Promise.resolve(true);
}

const isUserAlreadyRegisteredRequest = async (res: ExpressResponse, email: string): Promise<any> => {
    const isUserAlreadyRegistered = await userRepository.checkIfUserAlreadyRegistered(res, email);
    if(isUserAlreadyRegistered !== false) {
        const user = await isUserAlreadyRegistered
        return user
    }
    return null;
}

const isUserVerifiedRequest = async (res: ExpressResponse, user: User): Promise<ExpressResponse> => {
    if(user && user.verified) {
        return sendSuccessResponse(res, HttpStatus.OK.code, HttpStatus.OK.status, 'User is already exists, login')
    }
    const token = await userRepository.saveVerificationTokenToDatabase(user);
    await sendVerificationEmail(user.email, token)
    return sendSuccessResponse(res, HttpStatus.OK.code, HttpStatus.OK.status, 'User already exists, please verify account on email')
}

const createUserRequest = async (res: ExpressResponse, firstName: string, lastName: string, email: string, password: string): Promise<ExpressResponse> => {
    const user = await userRepository.saveUserToDatabase(firstName, lastName, email, password);
    await userRepository.saveUserRoleToDatabase(user);
    const token = await userRepository.saveVerificationTokenToDatabase(user);
    await sendVerificationEmail(email, token);
    return sendSuccessResponse(res, HttpStatus.OK.code, HttpStatus.OK.status, messages.userCreated)
};