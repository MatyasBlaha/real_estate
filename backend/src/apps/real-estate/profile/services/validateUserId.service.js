import { profileRepository } from '../repository/profile.repository.js'
import {sendErrorResponse} from "../../../shared/utils/http/handleHttpStatus/sendHttpResponse.js";
import HttpStatus from '../../../shared/utils/http/HttpStatus.utils.js'

const messages = {
    userNotFound: 'User not found, please login in',
}


export const validateUserId = async (res, userId) => {
    const user = await profileRepository.checkUserExists(userId);

    if(!user) {
        return sendErrorResponse(res, HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, messages.userNotFound)
    }

}