import {Request, Response as ExpressResponse} from "express"
import HttpStatus from '../../../shared/utils/http/HttpStatus.utils'

import {handleInternalServerError} from "../../../shared/utils/http/handleHttpStatus/handleInternalServerError";
import {sendSuccessResponse} from "../../../shared/utils/http/handleHttpStatus/sendHttpResponse";
import encrypt from "../../../shared/utils/encryptText.utils";

const messages = {
    getProfileSuccess: 'profile show'
}


export const getProfile = async (req: Request, res: ExpressResponse): Promise<ExpressResponse> => {
    try {
        const profile = res.locals.profile

        const hashedProfileId = await encrypt(profile.id);

        const responseData = {
            id: hashedProfileId,
            firstName: profile.first_name,
            lastName: profile.last_name,
            description: profile.description,
            avatarPath: profile.avatar_path
        }

        return sendSuccessResponse(res, HttpStatus.OK.code, HttpStatus.OK.status, messages.getProfileSuccess, responseData)
    } catch (error: any) {
        return handleInternalServerError(res, error)
    }

}