import Response from "../../shared/models/response.js";
import HttpStatus from "../../shared/utils/HttpStatus.utils.js";
import logger from '../../shared/log/logger.js'
import { createResponse } from "../../shared/utils/response.utils.js";

import {checkUserExistenceAndVerification, updateLastLoginTimeStamp} from "../repository/login.repository.js";

import validateLoginInput from "../services/login/validateLoginInput.service.js";
import verificatePassword from "../services/login/verificationPassword.service.js";
import {setSessionAndCookies} from "../utils/cookie.utils.js";

export const login = async (req, res) => {
    try {
        const {email, password} = req.body

        // Validate login input.
       const validationLoginResult =  validateLoginInput(email, password);

        if(validationLoginResult.error) {
            return res.status(validationLoginResult.error.code).json(createResponse(validationLoginResult.error.code, validationLoginResult.error.status, validationLoginResult.error.message, null));
        }

        // Check if user exists and is verified in the database.
       const user = await checkUserExistenceAndVerification(email)

        if(user.error) {
            return res.status(user.error.code).json(createResponse(user.error.code, user.error.status, user.error.message, null));
        }

        // Check if user exists and is verified in the database.
        if(user.verified !== 1) {
            return res.status(HttpStatus.UNAUTHORIZED.code).json(new Response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'User is not verified, please check email', null));
        }

        // Verify password.
        const verifiedPassword = await verificatePassword(password, user.password);
        if (typeof verifiedPassword === 'object' && verifiedPassword.error) {
            return res.status(verifiedPassword.error.code).json(createResponse(verifiedPassword.error.code, verifiedPassword.error.status, verifiedPassword.error.message, null));
        }

        //Update last login time to user.
        await updateLastLoginTimeStamp(user.id)

    
        // Create session and username token.
        await setSessionAndCookies(req, res, user)


        res.status(HttpStatus.OK.code).json(createResponse(HttpStatus.OK.code, HttpStatus.OK.status, 'Login successful', null));
        
    } catch (err) {
        logger.error({ error: err.message })
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json(createResponse(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Internal Server Error', null));
    }
}
