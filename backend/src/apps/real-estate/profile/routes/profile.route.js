import express from 'express';
const profileRouter = express.Router();

import profileProtectedRouter from './protected/profileProtected.route.js';

profileRouter.use('/profile', profileProtectedRouter)

export default profileRouter;