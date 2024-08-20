import Response from "../models/response.js";

export const createResponse = (options: { code: number, status: string, message: string, data: any }) => {
    return new Response(options.code, options.status, options.message, options.data);
};
