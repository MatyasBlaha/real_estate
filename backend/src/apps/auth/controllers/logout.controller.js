import HttpStatus from "../../shared/utils/HttpStatus.utils.js";
import { createResponse } from '../../shared/utils/response.utils.js'
import logger from "../../shared/log/logger.js"

import loadEnvFile from "../../../../env/config.js";
import removeCookies from "../utils/removeCookies.utils.js";
loadEnvFile('.env.security');

export const logout = async (req, res) => {

    try {
        req.session.destroy(async err => {
            if (err) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json(createResponse(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'An error occurred while logging out', null));
            }
            res.clearCookie(process.env.SESSION_COOKIES_NAME);

            await removeCookies(res)
            return res.status(HttpStatus.OK.code).json(createResponse(HttpStatus.OK.code, HttpStatus.OK.status, 'Logged out successfully', null));
        })
    } catch (err) {
        logger.error(err)
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json(createResponse(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'internal Server Error', null))
    }
}