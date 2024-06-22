const HttpStatus = {
    OK: { code: 200, status: 'OK' },
    CREATED: { code: 201, status: 'CREATED' },
    NO_CONTENT: { code: 204, status: 'NO_CONTENT' },
    BAD_REQUEST: { code: 400, status: 'BAD_REQUEST' },
    UNAUTHORIZED: { code: 401, status: 'UNAUTHORIZED' },
    INVALID_FORMAT: { code: 403, status: 'INVALID_FORMAT' },
    NOT_FOUND: { code: 404, status: 'NOT_FOUND' },
    LIMIT_FILE_SIZE: { code: 413, status: 'LIMIT_FILE_SIZE' },
    TOO_MANY_REQUESTS: { code: 429, status: 'TOO_MANY_REQUESTS' },
    INTERNAL_SERVER_ERROR: { code: 500, status: 'INTERNAL_SERVER_ERROR' }
};

export default HttpStatus;