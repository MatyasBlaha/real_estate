import {Response as ExpressResponse} from "express";
import validateRegisterInput from "../../services/register/validateRegistrationInput.service";
import {sendErrorResponse} from "../../../shared/utils/http/handleHttpStatus/sendHttpResponse";

export const validateRegisterRequest = async (res: ExpressResponse, firstName: string, lastName: string, email: string, password: string): Promise<boolean> => {
    const validationRegisterResult = validateRegisterInput(firstName, lastName, email, password);
    if (validationRegisterResult.error) {
        sendErrorResponse(res, validationRegisterResult.error.code, validationRegisterResult.error.status, validationRegisterResult.error.message);
    }
    return true;
};