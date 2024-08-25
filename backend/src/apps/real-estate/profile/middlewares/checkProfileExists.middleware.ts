import {NextFunction, Request, Response} from "express";
import HttpStatus from '../../../shared/utils/http/HttpStatus.utils'
import {handleInternalServerError} from "../../../shared/utils/http/handleHttpStatus/handleInternalServerError";
import {profileRepository} from "../repository/profile.repository";
import {sendErrorResponse} from "../../../shared/utils/http/handleHttpStatus/sendHttpResponse";

const messages = {
    profileNotFound: "Profile not found",
}

interface SessionRequest extends Request {
    session: {
        userId?: string;
    };
}


export const checkProfileExistsMiddleware = async (req: SessionRequest, res: Response, next: NextFunction) => {

    try {
        const userId = req.session.userId

        const profile = await profileRepository.checkProfileExists(res, userId)

        if(profile) {
            res.locals.profile = profile
            next()
        }

        if(!profile) {
            return sendErrorResponse(res, HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, messages.profileNotFound)
        }


    } catch (error: any) {
        return handleInternalServerError(res, error);
    }

};
