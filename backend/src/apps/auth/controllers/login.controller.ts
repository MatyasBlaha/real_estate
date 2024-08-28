import { Request, Response as ExpressResponse } from 'express';
import HttpStatus from "../../shared/utils/http/HttpStatus.utils";
import { messages } from "../helper/login/messages";

// Response
import { sendSuccessResponse } from '../../shared/utils/http/handleHttpStatus/sendHttpResponse'
import { handleInternalServerError } from "../../shared/utils/http/handleHttpStatus/handleInternalServerError";

// Helper functions
import { validateLoginRequest } from "../helper/login/validateLoginRequest";
import { fetchAndVerifyUserRequest } from "../helper/login/fetchAndVerifyUserRequest";
import { checkPasswordRequest } from "../helper/login/checkPasswordRequest";
import { finalizeLoginRequest } from "../helper/login/finalizeLoginRequest";

// Interface
import { LoginRequestBody } from "../interfaces/LoginRequestBody";
import {profileRepository} from "../../real-estate/profile/repository/profile.repository";


export const login = async (req: Request<{}, {}, LoginRequestBody>, res: ExpressResponse): Promise<ExpressResponse> => {
    try {

        // Extracting data from request body
        const { email, password } = req.body;

        // Validating request body data
        if (!await validateLoginRequest(res, email, password)) return;

        // Fetching and verifying user from the database
        const user = await fetchAndVerifyUserRequest(res, email);
        if (!user) return;

        const profile = await profileRepository.checkProfileExistsWithUserId(res, user.id)

        // Checking if provided password matches stored password
        if (!await checkPasswordRequest(res, password, user.password)) return;

        // Finalizing login by setting session and cookies
        await finalizeLoginRequest(res, req, user, profile);

        // Sending success response with JWT token and session data
        return sendSuccessResponse(res, HttpStatus.OK.code, HttpStatus.OK.status, messages.loginSuccessful);
    } catch (error: any) {
        // Handle unexpected error
        return handleInternalServerError(res, error);
    }
};


