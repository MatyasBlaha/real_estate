import express from 'express';
const publicRouter = express.Router();

import verifyEmailVerification from "../../services/email/verifyEmailVerification.service.js";

import { register } from '../../controllers/register.controller.js'
import { login } from '../../controllers/login.controller.js'
import { logout } from '../../controllers/logout.controller.js'

import isAuthenticated from "../../middleware/isAuthenticated.middleware.js";



publicRouter.get('/email/:token', verifyEmailVerification)
publicRouter.get('/test', isAuthenticated, (req, res) => {
    res.json({ message: "Authenticated route", userId: req.session.userId });
})

publicRouter.post('/register', register)
publicRouter.post('/login', login);
publicRouter.post('/logout', isAuthenticated, logout)

export default publicRouter;