import { Response as ExpressResponse } from 'express';
import logger from '../../../log/logger';
import HttpStatus from '../HttpStatus.utils';
import { createResponse } from "../../response.utils";

interface ResponseOptions {
    code: number;
    status: string;
    message: string;
    data: any;
}


const sendSuccessResponse = (res: ExpressResponse, code: number, status: string, message: string, data: any = null): ExpressResponse => {
    const responseOptions: ResponseOptions = {
        code,
        status,
        message,
        data
    };
    return res.status(HttpStatus.OK.code).json(createResponse(responseOptions));
};


const sendErrorResponse = (res: ExpressResponse, code: number, status: string, message: string, error: Error | null = null): ExpressResponse => {
    if (error) {
        logger.error({ error: error.message });
    }
    const responseOptions: ResponseOptions = {
        code,
        status,
        message,
        data: null
    };
    return res.status(code).json(createResponse(responseOptions));
};

export { sendSuccessResponse, sendErrorResponse };
