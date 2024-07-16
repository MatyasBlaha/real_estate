import HttpStatus from '../../shared/utils/HttpStatus.utils.js';
import { createResponse } from "../../shared/utils/response.utils.js";
import Response from "../../shared/models/response.js";

const isAuthenticated = (req, res, next) => {
    console.log(req.session)
    if(req.session && req.session.userId) {
        return next();
    } else {
        return res.status(HttpStatus.UNAUTHORIZED.code).json(createResponse(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Unauthorized', null));
    }
}

export default isAuthenticated;