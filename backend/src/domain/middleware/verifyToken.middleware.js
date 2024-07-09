import jwt from 'jsonwebtoken';

import HttpStatus from "../../utils/HttpStatus.utils.js";
import logger from "../../log/logger.js";
import Response from "../../models/response.js";
import loadEnvFile from "../../../env/config.js";


const verifyToken = (req, res, next) => {
    try{
        loadEnvFile('.env.security');

        const token = req.header('Authorization');
        if(!token) {
            res.status(HttpStatus.UNAUTHORIZED.code).json(new Response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'access denied', null));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        if(!decoded) {
            res.status(HttpStatus.UNAUTHORIZED.code).json(new Response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'access denied', null));
        }

        req.userId = decoded.userId;

        next();
    } catch (err) {
        logger.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, "couldn't login user", null));
    }

}

export default verifyToken;