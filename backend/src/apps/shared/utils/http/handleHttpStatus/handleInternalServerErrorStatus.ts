import logger from '../../../log/logger'
import HttpStatus from "../HttpStatus.utils.ts";
import {createResponse} from "../../response.utils";

const handleInternalServerErrorStatus = (error: Error, res: any) => {
    logger.error({error: error.message});
    const errorResponseOption = {
        code: HttpStatus.INTERNAL_SERVER_ERROR.code,
        status: HttpStatus.INTERNAL_SERVER_ERROR.status,
        message: 'Internal Server Error',
        data: null
    };
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json(createResponse(errorResponseOption))
};

export { handleInternalServerErrorStatus }