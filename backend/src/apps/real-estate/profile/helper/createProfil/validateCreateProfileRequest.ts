import { Response as ExpressResponse } from "express";
import { validateUserId } from "../../services/validateUserId.service";

export const validateCreateProfileRequest = async (res: ExpressResponse, userId: any) => {
    await validateUserId(res, userId)
}