import HttpStatus from "../../shared/utils/http/HttpStatus.utils.ts";
import Response from "../../shared/models/response.js";
import updateVerified from "../../shared/queries/updateRecord.query.js";
import checkRecordExists from "../../shared/queries/checkRecordExists.query.js";
import verifyEmailVerificationRepository from "../repository/verifyEmailVerification.repository.js";
import {createResponse} from "../../shared/utils/response.utils.ts";

const verifyEmailVerification = async (req, res) => {

    const currentTime = new Date();

    try {
        const token = req.params.token;

        if (token) {
            const verifiedToken = await verifyEmailVerificationRepository.checkIfVerificationTokenExists(token)

            if (!verifiedToken) {
                res.status(HttpStatus.UNAUTHORIZED.code).json(createResponse(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Invalid token', null));
                return;
            }

            if (currentTime < verifiedToken.token_expires_at) {
                await updateVerified("users", verifiedToken.user_id);
                res.status(HttpStatus.CREATED.code).json(createResponse(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'User verified successfully', null));
            } else {
                res.status(HttpStatus.FORBIDDEN.code).json(createResponse(HttpStatus.FORBIDDEN.code, HttpStatus.FORBIDDEN.status, 'Token has expired', null));
            }
        } else {
            res.status(HttpStatus.UNAUTHORIZED.code).json(createResponse(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Invalid token', null));
        }
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json(createResponse(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Internal Server Error', null));
    }
};

export default verifyEmailVerification;