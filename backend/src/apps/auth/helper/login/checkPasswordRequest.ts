import {Response as ExpressResponse} from "express";
import verificationPassword from "../../services/login/verificationPassword.service";
import {sendErrorResponse} from "../../../shared/utils/http/handleHttpStatus/sendHttpResponse";
import HttpStatus from "../../../shared/utils/http/HttpStatus.utils";
import {messages} from "./messages";

export const checkPasswordRequest = async (res: ExpressResponse, inputPassword: string, storedPassword: string): Promise<boolean> => {
    const verifiedPassword = await verificationPassword(inputPassword, storedPassword);
    if (!verifiedPassword.isValid) {
        sendErrorResponse(res, HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, messages.incorrectPassword);
        return Promise.resolve(false);
    }
    return Promise.resolve(true);
};