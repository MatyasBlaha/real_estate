import express from 'express';
const publicRouter = express.Router();

import verifyEmailVerification from "../../controllers/verifyEmailVerification.controller.js";

import { register } from '../../controllers/register.controller.js'
import { login } from '../../controllers/login.controller.ts'



publicRouter.get('/email/:token', verifyEmailVerification)


publicRouter.post('/register', register)
publicRouter.post('/login', login);

export default publicRouter;