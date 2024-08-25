import {Request, Response as ExpressResponse} from "express"
import HttpStatus from '../../../shared/utils/http/HttpStatus.utils'

import {handleInternalServerError} from "../../../shared/utils/http/handleHttpStatus/handleInternalServerError";
import {sendSuccessResponse} from "../../../shared/utils/http/handleHttpStatus/sendHttpResponse";

const messages = {
    getProfileSuccess: 'profile show'
}


export const getProfile = async (req: Request, res: ExpressResponse): Promise<ExpressResponse> => {

    try {
        const profile = res.locals.profile
        return sendSuccessResponse(res, HttpStatus.OK.code, HttpStatus.OK.status, messages.getProfileSuccess, profile)
    } catch (error: any) {
        return handleInternalServerError(res, error)
    }

}