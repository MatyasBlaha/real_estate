import logger from '../../../log/logger'
import HttpStatus from '../HttpStatus.utils'
import {createResponse} from "../../response.utils";


const handleOkStatus = (error: Error, res: any, message: string) => {
    logger.error({error: error.message});
    const okResponseOption = {
        code: HttpStatus.OK.code,
        status: HttpStatus.OK.status,
        message,
        data: null
    };
    return res.status(HttpStatus.OK.code).json(createResponse(okResponseOption))
};

export {handleOkStatus}