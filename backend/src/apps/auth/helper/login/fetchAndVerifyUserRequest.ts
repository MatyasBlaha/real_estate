import {Response as ExpressResponse} from "express";
import {checkUserExistenceAndVerification} from "../../repository/login.repository";
import {sendErrorResponse} from "../../../shared/utils/http/handleHttpStatus/sendHttpResponse";
import HttpStatus from "../../../shared/utils/http/HttpStatus.utils";
import userRepository from "../../repository/register.repository";
import sendVerificationEmail from "../../services/email/sendVerificationEmail.service";
import { messages } from "./messages";

export const fetchAndVerifyUserRequest = async (res: ExpressResponse, email: string) => {
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