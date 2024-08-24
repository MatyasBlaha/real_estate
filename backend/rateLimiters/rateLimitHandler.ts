import {Request, Response as ExpressResponse} from "express";
import {sendErrorResponse} from "../src/apps/shared/utils/http/handleHttpStatus/sendHttpResponse";
import HttpStatus from "../src/apps/shared/utils/http/HttpStatus.utils";

export const rateLimitExceededHandler = (req: Request, res: ExpressResponse) => {
    return sendErrorResponse(res, HttpStatus.TOO_MANY_REQUESTS.code, HttpStatus.TOO_MANY_REQUESTS.status, "Too Many Requests. Please try again later.", null)
}