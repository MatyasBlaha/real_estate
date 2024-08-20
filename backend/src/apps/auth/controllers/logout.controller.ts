import HttpStatus from "../../shared/utils/http/HttpStatus.utils.js";
import loadEnvFile from "../../../../env/config.js";
import removeCookies from "../utils/removeCookies.utils.js";
import { sendSuccessResponse, sendErrorResponse } from '../../shared/utils/http/handleHttpStatus/sendHttpResponse'
import {Request, Response as ExpressResponse} from "express";

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
                return sendErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Internal Server Error', error);
            }
            res.clearCookie(process.env.SESSION_COOKIES_NAME);

            await removeCookies(res)
            return sendSuccessResponse(res, 'Logout successful', null);
        })
    } catch (error: Error) {
        return sendErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Internal Server Error', error);
    }
}