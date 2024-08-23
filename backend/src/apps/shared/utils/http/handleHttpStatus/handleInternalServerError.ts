import {Response as ExpressResponse} from "express";
import {sendErrorResponse} from "./sendHttpResponse";
import HttpStatus from "../HttpStatus.utils";

const message = 'Internal Server Error';

export const handleInternalServerError = (res: ExpressResponse, error: any): ExpressResponse => {
    return sendErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, message, error);
};