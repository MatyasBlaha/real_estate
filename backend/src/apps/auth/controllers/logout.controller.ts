import HttpStatus from "../../shared/utils/http/HttpStatus.utils.js";
import loadEnvFile from "../../../../env/config.js";
import removeCookies from "../utils/removeCookies.utils.js";
import { sendSuccessResponse, sendErrorResponse } from '../../shared/utils/http/handleHttpStatus/sendHttpResponse'
import {Request, Response as ExpressResponse} from "express";
import {handleInternalServerError} from "../../shared/utils/http/handleHttpStatus/handleInternalServerError";

loadEnvFile('.env.security');

interface CustomSessionRequest extends Request {
    session: {
        destroy: (callback: (err: Error | null) => void) => void;
    };
}

export const logout = async (req: CustomSessionRequest, res: ExpressResponse): Promise<ExpressResponse> => {

    try {

        req.session.destroy(async (error: Error) => {
            if (error) {
                return handleInternalServerError(res, error);
            }

            await removeCookies(res)
            return sendSuccessResponse(res, HttpStatus.OK.code, HttpStatus.OK.status, 'Logout successful', null);
        })
    } catch (error: Error) {
        return handleInternalServerError(res, error);
    }
}