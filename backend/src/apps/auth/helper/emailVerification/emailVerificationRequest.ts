import {Response as ExpressResponse} from "express";
import checkRecordExists from "../../../shared/queries/checkRecordExists.query.js";
import {handleInternalServerError} from "../../../shared/utils/http/handleHttpStatus/handleInternalServerError";
import {sendErrorResponse} from "../../../shared/utils/http/handleHttpStatus/sendHttpResponse";
import HttpStatus from "../../../shared/utils/http/HttpStatus.utils.js";


const messages = {
    TokenNotFound: 'Verification token not found',
}


const tableName = 'user_verification_tokens'
const column = 'verification_token'

export const emailVerificationRequest = async (res: ExpressResponse, token: string): Promise<ExpressResponse | any> => {
    try {

        const data = token

        const verifiedToken = await checkRecordExists(tableName, column, data)

        if(!verifiedToken) {
            return sendErrorResponse(res, HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, messages.TokenNotFound)
        }

        return verifiedToken


    } catch (error: any) {
        return handleInternalServerError(res, error)
    }
}