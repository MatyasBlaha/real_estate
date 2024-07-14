import Response from "../models/response.js";

export const createResponse = (code, status, message, data) => {
    return new Response(code, status, message, data);
};

export const errorResponse = (err, code = 500, status = 'INTERNAL_SERVER_ERROR') => {
    return createResponse(code, status, err.message, err);
}