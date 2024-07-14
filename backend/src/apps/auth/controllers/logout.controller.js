import HttpStatus from "../../shared/utils/HttpStatus.utils.js";
import { createResponse } from '../../shared/utils/response.utils.js'

import loadEnvFile from "../../../../env/config.js";
loadEnvFile('.env.security');

export const logout = async (req, res) => {

    req.session.destroy(err => {
        if(err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json(createResponse(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'An error occurred while logging out', null));
        }
        res.clearCookie(process.env.SESSION_COOKIES_NAME);
        return res.status(HttpStatus.OK.code).json(createResponse(HttpStatus.OK.code, HttpStatus.OK.status, 'Logged out successfully', null));
    })
}