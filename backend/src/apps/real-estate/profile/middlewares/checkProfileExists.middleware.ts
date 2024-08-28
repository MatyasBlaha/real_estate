import {NextFunction, Request, Response} from "express";
import HttpStatus from '../../../shared/utils/http/HttpStatus.utils'
import {handleInternalServerError} from "../../../shared/utils/http/handleHttpStatus/handleInternalServerError";
import {profileRepository} from "../repository/profile.repository";
import {sendErrorResponse, sendSuccessResponse} from "../../../shared/utils/http/handleHttpStatus/sendHttpResponse";
import encrypt from "../../../shared/utils/encryptText.utils";

const messages = {
    profileNotFound: "Profile Dashboard not found",
}

interface IParam {
    profileId: string
}


export const checkProfileExistsMiddleware = async (req: Request<IParam>, res: Response, next: NextFunction) => {

    try {


        const profileId = req.params.profileId;

        const profile = await profileRepository.checkProfileExists(res, profileId)

        if(profile) {
            res.locals.profile = profile
            next()
        }

        if(!profile) {
            return sendSuccessResponse(res, HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, messages.profileNotFound)
        }


    } catch (error: any) {
        return handleInternalServerError(res, error);
    }

};
