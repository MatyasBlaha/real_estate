import express from 'express';
const authRouter = express.Router();

import publicRouter from "./public/authPublic.route.js";
//import protectedRouter from "./public/authProtected.route.js";

authRouter.use('/public', publicRouter);
//authRouter.use('/protected', protectedRouter);

export default authRouter;