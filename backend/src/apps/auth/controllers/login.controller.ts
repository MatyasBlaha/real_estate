// login.controller.ts

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

import { handleInternalServerError } from "../../shared/utils/http/handleHttpStatus/handleInternalServerError";


const messages = {
    emailAndPasswordRequired: 'Email and Password are required',
    userNotFound: 'User not found',
    userNotVerified: 'User is not verified, check your email',
    incorrectPassword: 'Incorrect Password',
    loginSuccessful: 'Login successful',
};

interface LoginRequestBody {
    email: string;
    password: string;
}

export const login = async (req: Request<{}, {}, LoginRequestBody>, res: ExpressResponse): Promise<ExpressResponse> => {
    try {
        const { email, password } = req.body;

        if (!await validateLoginRequest(res, email, password)) return;

        const user = await fetchAndVerifyUser(res, email);
        if (!user) return;

        if (!await checkPassword(res, password, user.password)) return;

        await finalizeLogin(res, req, user);

        return sendSuccessResponse(res, HttpStatus.OK.code, HttpStatus.OK.status, messages.loginSuccessful);
    } catch (error: any) {
        return handleInternalServerError(res, error);
    }
};

// Helper function - validating login input
const validateLoginRequest = async (res: ExpressResponse, email: string, password: string): Promise<boolean> => {
    const validationLoginResult = await validateLoginInput(email, password);
    if (!validationLoginResult.isValid) {
        sendErrorResponse(res, HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, messages.emailAndPasswordRequired);
        return false;
    }
    return true;
};

// Helper function - fetching and verifying the user
const fetchAndVerifyUser = async (res: ExpressResponse, email: string) => {
    const user = await checkUserExistenceAndVerification(email);
    if (!user) {
        sendErrorResponse(res, HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, messages.userNotFound);
        return null;
    }

    if (user.verified !== 1) {
        const token = await userRepository.saveVerificationTokenToDatabase(user);
        await sendVerificationEmail(email, token);
        sendErrorResponse(res, HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, messages.userNotVerified);
        return null;
    }

    return user;
};

// Helper function - checking the password
const checkPassword = async (res: ExpressResponse, inputPassword: string, storedPassword: string): Promise<boolean> => {
    const verifiedPassword = await verificationPassword(inputPassword, storedPassword);
    if (!verifiedPassword.isValid) {
        sendErrorResponse(res, HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, messages.incorrectPassword);
        return Promise.resolve(false);
    }
    return Promise.resolve(true);
};

// Helper function - finalize login process
const finalizeLogin = async (res: ExpressResponse, req: Request, user: any) => {
    await updateLastLoginTimeStamp(user.id);
    await setSessionAndCookies(req, res, user);
};
