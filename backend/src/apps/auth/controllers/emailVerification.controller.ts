import { Request, Response as ExpressResponse } from "express"
import { messages} from "../helper/emailVerification/messages";
import HttpStatus from "../../shared/utils/http/HttpStatus.utils.ts";


// Helper functions
import {handleInternalServerError} from "../../shared/utils/http/handleHttpStatus/handleInternalServerError.js";
import {emailVerificationRequest} from "../helper/emailVerification/emailVerificationRequest";
import {sendErrorResponse} from "../../shared/utils/http/handleHttpStatus/sendHttpResponse";
import {checkExpiredTokenRequest} from "../helper/emailVerification/checkExpiredTokenRequest";


export const verifyEmailVerification = async (req: Request, res: ExpressResponse): Promise<ExpressResponse> => {

    try {

        // Get token from request params
        const token: string = req.params.token;

        if (token) {
            const verifiedToken = await emailVerificationRequest(res, token)

            // Check if token is valid
            if (!verifiedToken) {
                return sendErrorResponse(res, HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, messages.invalidToken)
            }

            // check if Token is time valid otherwise create new
            await checkExpiredTokenRequest(res, verifiedToken)

        // handle error
        } else {
            return sendErrorResponse(res, HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, messages.invalidToken)
        }
    } catch (error: any) {
        // Handle unexpected error
        return handleInternalServerError(res, error);
    }
};