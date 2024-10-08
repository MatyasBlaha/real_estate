import { Request, Response as ExpressResponse } from "express";
import HttpStatus from "../../shared/utils/http/HttpStatus.utils.ts";
import { messages } from "../helper/register/messages";

// Response
import {sendErrorResponse } from "../../shared/utils/http/handleHttpStatus/sendHttpResponse";
import { handleInternalServerError } from "../../shared/utils/http/handleHttpStatus/handleInternalServerError";

// Helper functions
import { validateRegisterRequest } from "../helper/register/validateRegisterRequest";
import { isUserAlreadyRegisteredRequest } from "../helper/register/isUserAlreadyRegisteredRequest";
import { resendVerificationEmailRequest } from "../helper/register/resendVerificationEmailRequest";
import { createUserRequest } from "../helper/register/createUserRequest";

// Interface
import { RegisterRequestBody } from "../interfaces/RegisterRequestBody"

export const register = async (req: Request<{}, {}, RegisterRequestBody>, res: ExpressResponse): Promise<ExpressResponse> => {
    try {
        console.log(req.body)
        // Extracting data from request body
        const { firstName, lastName, country, phoneNumber, email, password } = req.body;

        // Validating request body data
        if (!await validateRegisterRequest(res, firstName, lastName, email, password)) return;

        // Checking if user already exists in the database
        const existingUser = await isUserAlreadyRegisteredRequest(res, email);

        // If user already exists, send success response if verified or resend verification email if not
        if (existingUser) {
            if (existingUser.verified) {
                return sendErrorResponse(res, HttpStatus.CONFLICT.code, HttpStatus.CONFLICT.status, messages.userExistsLogin);
            } else {
                return await resendVerificationEmailRequest(res, existingUser);
            }
        }

        // If user does not exist, create a new user in the database and send verification email
        return await createUserRequest(res, firstName, lastName, country, phoneNumber, email, password);

    } catch (error: any) {
        // Handle unexpected error
        return handleInternalServerError(res, error);
    }
};

