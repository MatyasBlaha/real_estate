import HttpStatus from "../../shared/utils/http/HttpStatus.utils.js";
import { createResponse } from '../../shared/utils/response.utils.js'
import logger from "../../shared/log/logger.js"
import loadEnvFile from "../../../../env/config.js";
import removeCookies from "../utils/removeCookies.utils.js";
import { handleInternalServerErrorStatus } from "../../shared/utils/http/handleHttpStatus/handleInternalServerErrorStatus";
import {handleOkStatus} from "../../shared/utils/http/handleHttpStatus/handleOkStatus";


loadEnvFile('.env.security');

export const logout: (req: any, res: any) => Promise<void> = async(req, res) => {

    try {
        req.session.destroy(async (error: Error) => {
            if (error) {
                return handleInternalServerErrorStatus(error, res)
            }
            res.clearCookie(process.env.SESSION_COOKIES_NAME);

            await removeCookies(res)
            return handleOkStatus(error, res, 'logout successful')
        })
    } catch (error: Error) {
        return handleInternalServerErrorStatus(error, res)
    }
}