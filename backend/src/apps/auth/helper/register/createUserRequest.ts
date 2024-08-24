import {Response as ExpressResponse} from "express";
import userRepository from "../../repository/register.repository";
import sendVerificationEmail from "../../services/email/sendVerificationEmail.service";
import {sendSuccessResponse} from "../../../shared/utils/http/handleHttpStatus/sendHttpResponse";
import HttpStatus from "../../../shared/utils/http/HttpStatus.utils";

import { messages } from "./messages";

export const createUserRequest = async (res: ExpressResponse, firstName: string, lastName: string, email: string, password: string): Promise<ExpressResponse> => {
    const user = await userRepository.saveUserToDatabase(firstName, lastName, email, password);
    await userRepository.saveUserRoleToDatabase(user);
    const token = await userRepository.saveVerificationTokenToDatabase(user);
    await sendVerificationEmail(email, token);
    return sendSuccessResponse(res, HttpStatus.CREATED.code, HttpStatus.CREATED.status, messages.userCreated, user);
};