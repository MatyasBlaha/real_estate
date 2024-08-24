import rateLimit, {Options as RateLimitOptions, RateLimitRequestHandler} from "express-rate-limit";
import { rateLimitExceededHandler } from "./rateLimitHandler";



export const globalRateLimiter: RateLimitRequestHandler = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    handler: rateLimitExceededHandler,
    standardHeaders: true,
    legacyHeaders: false,
} as RateLimitOptions)