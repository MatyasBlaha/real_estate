import express from 'express';
const authRouter = express.Router();

import publicRouter from "./public/authPublic.route.js";
import authProtectedRouter from "./protected/authProtected.route.js";

authRouter.use('/public', publicRouter);
authRouter.use('/protected', authProtectedRouter);

export default authRouter;