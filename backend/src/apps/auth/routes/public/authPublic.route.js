import express from 'express';
const publicRouter = express.Router();

import verifyEmailVerification from "../../controllers/verifyEmailVerification.controller.ts";

import { register } from '../../controllers/register.controller.ts'
import { login } from '../../controllers/login.controller.ts'



publicRouter.get('/email/:token', verifyEmailVerification)


publicRouter.post('/register', register)
publicRouter.post('/login', login);

export default publicRouter;