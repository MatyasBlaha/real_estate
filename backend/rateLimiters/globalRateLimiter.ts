import { rateLimitExceededHandler } from "./rateLimitHandler";
import rateLimit from "express-rate-limit";



export const globalRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    handler: rateLimitExceededHandler,
    standardHeaders: true,
    legacyHeaders: false,
})