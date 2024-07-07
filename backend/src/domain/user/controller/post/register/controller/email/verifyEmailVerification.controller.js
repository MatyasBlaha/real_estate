import HttpStatus from "../../../../../../../utils/HttpStatus.utils.js";
import Response from "../../../../../../../models/response.js";
import updateVerified from "../../../../../../../query/updateVerified.query.js";
import checkRecordExists from "../../../../../../../query/checkRecordExists.query.js";

const verifyEmailVerification = async (req, res) => {
    try {
        const token = req.params.token;

        if (token) {
            const tokenExists = await checkRecordExists("user_verification_tokens", "verification_token", token);

            if (!tokenExists) {
                res.status(HttpStatus.UNAUTHORIZED.code).json(new Response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Invalid token', null));
                return;
            }

            const currentTime = new Date();
            if (currentTime < tokenExists.token_expires_at) {
                await updateVerified("users", tokenExists.user_id);
                res.status(HttpStatus.CREATED.code).json(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'createUser verified successfully', null));
            } else {
                res.status(HttpStatus.FORBIDDEN.code).json(new Response(HttpStatus.FORBIDDEN.code, HttpStatus.FORBIDDEN.status, 'Token has expired', null));
            }
        } else {
            res.status(HttpStatus.UNAUTHORIZED.code).json(new Response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Invalid token', null));
        }
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Internal Server Error', null));
    }
};

export default verifyEmailVerification;