import { Request, Response as ExpressResponse } from "express";
import {sendErrorResponse, sendSuccessResponse} from "../../../shared/utils/http/handleHttpStatus/sendHttpResponse";
import HttpStatus from '../../../shared/utils/http/HttpStatus.utils';
import { profileRepository } from "../repository/profile.repository";
import { handleInternalServerError } from "../../../shared/utils/http/handleHttpStatus/handleInternalServerError";

interface SessionRequest extends Request {
    session: {
        userId?: string;
    };
}

export const createProfile = async (req: SessionRequest, res: ExpressResponse): Promise<ExpressResponse> => {
    try {

        // Extracting data from session cookies
        const userId = req.session.userId;

        // Extracting fields from req.body
        const { firstName, lastName, description, mobile_phone } = req.body;


        // Save profile to the database
        const profile = await profileRepository.saveProfileToDatabase(res, userId, firstName, lastName, description, mobile_phone);

        return sendSuccessResponse(res, HttpStatus.OK.code, HttpStatus.OK.status, 'Profile created successfully', profile);
    } catch (error) {
        return handleInternalServerError(res, error);
    }
};
