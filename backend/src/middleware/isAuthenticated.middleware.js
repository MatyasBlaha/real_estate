import HttpStatus from '../apps/shared/utils/http/HttpStatus.utils.ts';
import {sendErrorResponse} from "../apps/shared/utils/http/handleHttpStatus/sendHttpResponse.ts";

const isAuthenticated = (req, res, next) => {
    if(req.session && req.session.userId) {
        return next();
    } else {
        return sendErrorResponse(res, HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Unauthorized')
    }
}

export default isAuthenticated;