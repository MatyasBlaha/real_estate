import { Request, Response as ExpressResponse } from 'express';
import HttpStatus from "../../shared/utils/http/HttpStatus.utils";

import {
    checkUserExistenceAndVerification,
    updateLastLoginTimeStamp
} from "../repository/login.repository";

import validateLoginInput from "../services/login/validateLoginInput.service";
import verificationPassword from "../services/login/verificationPassword.service";
import { setSessionAndCookies } from "../utils/cookie.utils";
import userRepository from "../repository/register.repository";
import sendVerificationEmail from "../services/email/sendVerificationEmail.service";

import { sendSuccessResponse, sendErrorResponse } from '../../shared/utils/http/handleHttpStatus/sendHttpResponse'

interface LoginRequestBody {
    email: string;
    password: string;
}

export const login = async (req: Request<{}, {}, LoginRequestBody>, res: ExpressResponse): Promise<ExpressResponse> => {

    const messageEmailAndPasswordRequired = 'Email and Password are required';
    const messageUserNotFound = 'User not found';
    const messageUserNotVerified = 'User is not verified, check your email';

    try {
        const { email, password } = req.body;

        const validationLoginResult = validateLoginInput(email, password);
        if (!validationLoginResult.isValid) {
            return sendErrorResponse(res, HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, messageEmailAndPasswordRequired);
        }

        const user = await checkUserExistenceAndVerification(email);

        if (!user) {
            return sendErrorResponse(res, HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, messageUserNotFound);
        }

        if (user.verified !== 1) {
            const token = await userRepository.saveVerificationTokenToDatabase(user);
            await sendVerificationEmail(email, token);
            return sendErrorResponse(res, HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, messageUserNotVerified);
        }

        const verifiedPassword = await verificationPassword(password, user.password);
        if(!verifiedPassword.isValid) {
            return sendErrorResponse(res, HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Incorrect Password');
        }

        await updateLastLoginTimeStamp(user.id);
        await setSessionAndCookies(req, res, user);

        return sendSuccessResponse(res, 'Login successful', null);

    } catch (error: any) {
        return sendErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Internal Server Error', error);
    }
};
