import { Request, Response as ExpressResponse } from "express";
import HttpStatus from "../../shared/utils/http/HttpStatus.utils.ts";

import { sendSuccessResponse } from "../../shared/utils/http/handleHttpStatus/sendHttpResponse";
import { handleInternalServerError } from "../../shared/utils/http/handleHttpStatus/handleInternalServerError";

import { validateRegisterRequest } from "../helper/register/validateRegisterRequest";
import { isUserAlreadyRegisteredRequest } from "../helper/register/isUserAlreadyRegisteredRequest";
import { resendVerificationEmailRequest } from "../helper/register/resendVerificationEmailRequest";
import { createUserRequest } from "../helper/register/createUserRequest";

import { messages } from "../helper/register/messages";
import { RegisterRequestBody} from "../interfaces/RegisterRequestBody"

export const register = async (req: Request<{}, {}, RegisterRequestBody>, res: ExpressResponse): Promise<ExpressResponse> => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!await validateRegisterRequest(res, firstName, lastName, email, password)) return;

        const existingUser = await isUserAlreadyRegisteredRequest(res, email);

        if (existingUser) {
            if (existingUser.verified) {
                return sendSuccessResponse(res, HttpStatus.OK.code, HttpStatus.OK.status, messages.userExistsLogin);
            } else {
                return await resendVerificationEmailRequest(res, existingUser);
            }
        }


        return await createUserRequest(res, firstName, lastName, email, password);

    } catch (error: any) {
        return handleInternalServerError(res, error);
    }
};

