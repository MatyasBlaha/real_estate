import rateLimit from "express-rate-limit";
import HttpStatus from "../utils/HttpStatus.js";

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    delayMs: 0,
    message: `Too many requests from this IP, please try again in 15 minutes (${HttpStatus.TOO_MANY_REQUESTS.code} - ${HttpStatus.TOO_MANY_REQUESTS.status})`,
});

export const limiter = (req, res, next) => {
    rateLimiter(req, res, next);
}