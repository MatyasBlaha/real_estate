interface HttpStatus {
    code: number;
    status: string;
}

const HttpStatusUtils: {
    OK: HttpStatus;
    CREATED: HttpStatus;
    NO_CONTENT: HttpStatus;
    BAD_REQUEST: HttpStatus;
    UNAUTHORIZED: HttpStatus;
    FORBIDDEN: HttpStatus;
    NOT_FOUND: HttpStatus;
    CONFLICT: HttpStatus;
    LIMIT_FILE_SIZE: HttpStatus;
    TOO_MANY_REQUESTS: HttpStatus;
    INTERNAL_SERVER_ERROR: HttpStatus;
} = {
    OK: { code: 200, status: 'OK' },
    CREATED: { code: 201, status: 'CREATED' },
    NO_CONTENT: { code: 204, status: 'NO_CONTENT' },
    BAD_REQUEST: { code: 400, status: 'BAD_REQUEST' },
    UNAUTHORIZED: { code: 401, status: 'UNAUTHORIZED' },
    FORBIDDEN: { code: 403, status: 'FORBIDDEN' },
    NOT_FOUND: { code: 404, status: 'NOT_FOUND' },
    CONFLICT: { code: 409, status: 'CONFLICT' },
    LIMIT_FILE_SIZE: { code: 413, status: 'LIMIT_FILE_SIZE' },
    TOO_MANY_REQUESTS: { code: 429, status: 'TOO_MANY_REQUESTS' },
    INTERNAL_SERVER_ERROR: { code: 500, status: 'INTERNAL_SERVER_ERROR' }
};

export default HttpStatusUtils;