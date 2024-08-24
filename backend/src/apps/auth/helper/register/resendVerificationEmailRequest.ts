import {Response as ExpressResponse} from "express";
import {User} from "../../interfaces/User.interface";
import userRepository from "../../repository/register.repository";
import sendVerificationEmail from "../../services/email/sendVerificationEmail.service";
import {sendSuccessResponse} from "../../../shared/utils/http/handleHttpStatus/sendHttpResponse";
import HttpStatus from "../../../shared/utils/http/HttpStatus.utils";

import { messages } from "./messages";

export const resendVerificationEmailRequest = async (res: ExpressResponse, user: User): Promise<ExpressResponse> => {
    const token = await userRepository.saveVerificationTokenToDatabase(user);
    await sendVerificationEmail(user.email, token);
    return sendSuccessResponse(res, HttpStatus.OK.code, HttpStatus.OK.status, messages.verifyAccount);
};