import {Response as ExpressResponse} from "express"
import updateVerified from "../../../shared/queries/updateRecord.query";
import HttpStatus from "../../../shared/utils/http/HttpStatus.utils";
import {sendErrorResponse, sendSuccessResponse} from "../../../shared/utils/http/handleHttpStatus/sendHttpResponse";
import {VerifiedToken} from '../../interfaces/VerificationTokenRequestBody'
import {messages} from './messages'


export const checkExpiredTokenRequest = async (res: ExpressResponse, verifiedToken: VerifiedToken): Promise<ExpressResponse> => {

    // Get current time
    const currentTime: Date = new Date();


    if (currentTime < verifiedToken.token_expires_at) {
        await updateVerified("users", verifiedToken.user_id);
        return sendSuccessResponse(res, HttpStatus.CREATED.code, HttpStatus.CREATED.status, messages.userVerified)
    } else {
        return sendErrorResponse(res, HttpStatus.FORBIDDEN.code, HttpStatus.FORBIDDEN.status, messages.tokenExpired)
    }
}