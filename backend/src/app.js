import express from 'express';
import cors from 'cors';
import connectDB from './database/database.js';
import Response from './apps/shared/models/response.js';
import  {globalRateLimiter } from "../rateLimiters/globalRateLimiter.js";
import HttpStatusUtils from "./apps/shared/utils/http/HttpStatus.utils.js";
import authRouter from "./apps/auth/routes/auth.route.js";
import sessionCookieMiddleware from "../src/apps/auth/config/sessionCookie.config.js";
import usernameCookieMiddleware from "../src/apps/auth/config/usernameCookies.config.js";
import profileRouter from "./apps/real-estate/profile/routes/profile.route.js";

const app = express();

app.use(cors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(globalRateLimiter)

app.use(sessionCookieMiddleware);
app.use(usernameCookieMiddleware);

app.use('/api/user', authRouter);
app.use('/api', profileRouter)

connectDB();

app.get('/', (req, res) => {
    res.send(new Response(HttpStatusUtils.OK.code, HttpStatusUtils.OK.status, 'realEstate API - v1.0.0'));
});

app.all('*', (req, res) => {
    res.status(HttpStatusUtils.NOT_FOUND.code)
        .send(new Response(HttpStatusUtils.NOT_FOUND.code, HttpStatusUtils.NOT_FOUND.status, 'Route does not exist on the server'));
});

export default app;
