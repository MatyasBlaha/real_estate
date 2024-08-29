import { Request, Response as ExpressResponse } from "express";
import {sendErrorResponse, sendSuccessResponse} from "../../../shared/utils/http/handleHttpStatus/sendHttpResponse";
import HttpStatus from '../../../shared/utils/http/HttpStatus.utils';
import { profileRepository } from "../repository/profile.repository";
import { handleInternalServerError } from "../../../shared/utils/http/handleHttpStatus/handleInternalServerError";
import {setProfileIdCookies} from "../../../auth/utils/cookie.utils";
import {validateCreateProfileRequest} from "../helper/createProfil/validateCreateProfileRequest";

interface SessionRequest extends Request {
    session: {
        userId?: string;
    };
}

const messages = {
    profileDashboardCreatedSuccessfully: 'Profile dashboard created successfully',
    unauthorized: 'Unauthorized',
}

export const createProfile = async (req: SessionRequest, res: ExpressResponse): Promise<ExpressResponse> => {
    try {

        // Extracting data from session cookies
        const userId = req.session.userId;

        // Validation user was found
        await validateCreateProfileRequest(res, userId)


        // Extracting fields from req.body
        const { firstName, lastName, description } = req.body;
        const avatar = req.file?.filename

        const avatarPath = `${avatar}`


        // Save profile to the database
        const profile = await profileRepository.saveProfileToDatabase(res, userId, firstName, lastName, description, avatarPath);
        await setProfileIdCookies(req, res, profile);
        // console.log(profile)

        return sendSuccessResponse(res, HttpStatus.OK.code, HttpStatus.OK.status, 'ProfileDashboard created successfully', profile);
    } catch (error) {
        return handleInternalServerError(res, error);
    }
};
