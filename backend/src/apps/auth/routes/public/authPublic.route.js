import express from 'express';
const publicRouter = express.Router();

import verifyEmailVerification from "../../services/email/verifyEmailVerification.service.js";

import { register } from '../../controllers/register.controller.js'
import { login } from '../../controllers/login.controller.js'



publicRouter.get('/email/:token', verifyEmailVerification)


publicRouter.post('/register', register)
publicRouter.post('/login', login);

export default publicRouter;