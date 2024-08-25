import { Request, NextFunction, Response } from "express";
import HttpStatus from '../../../shared/utils/http/HttpStatus.utils';
import { profileRepository } from "../repository/profile.repository";
import { sendErrorResponse } from "../../../shared/utils/http/handleHttpStatus/sendHttpResponse";

interface SessionRequest extends Request {
    session: {
        userId?: string;
    };
}

export const ensureProfileDoesNotExistMiddleware = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.session.userId;

        const profileExist = await profileRepository.checkProfileExists(res, userId)

        if(profileExist) {
            return sendErrorResponse(res, HttpStatus.CONFLICT.code, HttpStatus.CONFLICT.status, 'Profile already exists');
        }

        next()

    } catch (error: any) {
        return sendErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Internal Server Error');
    }
};
