import {Response as ExpressResponse} from "express";
import validateLoginInput from "../../services/login/validateLoginInput.service";
import {sendErrorResponse} from "../../../shared/utils/http/handleHttpStatus/sendHttpResponse";
import HttpStatus from "../../../shared/utils/http/HttpStatus.utils";

import { messages } from "./messages";

export const validateLoginRequest = async (res: ExpressResponse, email: string, password: string): Promise<boolean> => {
    const validationLoginResult = await validateLoginInput(email, password);
    if (!validationLoginResult.isValid) {
        sendErrorResponse(res, HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, messages.emailAndPasswordRequired);
        return false;
    }
    return true;
};