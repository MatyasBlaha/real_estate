import bcrypt from "bcrypt";
import HttpStatus from "../../../../../utils/HttpStatus.utils.js";
import Response from "../../../../../models/response.js";
import logger from "../../../../../log/logger.js";
import checkRecordExists from "../../../../../query/checkRecordExists.query.js";
import updateLastLoginTimeStampQuery from "./query/updateLastLoginTimeStamp.query.js";
import createJWToken from "./controller/createJWToken.controller.js";

export const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(HttpStatus.BAD_REQUEST.code).json(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Email and password are required', null));
    }

    try {
        const user = await checkRecordExists("users", "email", email);

        // Check if user exists
        if (!user) {
            return res.status(HttpStatus.UNAUTHORIZED.code).json(new Response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'User not found', null));
        }

        // Check if user is verified
        if (user.verified !== 1) {
            return res.status(HttpStatus.UNAUTHORIZED.code).json(new Response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'User is not verified, please check email', null));
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(HttpStatus.UNAUTHORIZED.code).json(new Response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Invalid password', null));
        }

        // Update last login timestamp
        await updateLastLoginTimeStampQuery("users", "last_login", user.id);

        // Create auth token
        const token = await createJWToken(user.id, user.email, res);
        if(!token) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, "Couldn't create JWT token", null));
        }

        res.status(HttpStatus.OK.code).json(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Login successful', token));
    } catch (err) {
        logger.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, "Couldn't login user", null));
    }
}
