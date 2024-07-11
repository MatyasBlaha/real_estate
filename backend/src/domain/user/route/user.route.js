import express from 'express';
const router = express.Router()

import { register } from "../controller/post/register/register.controller.js";
import { login } from "../controller/post/login/login.controller.js"
import isAuthenticated from "../../middleware/isAuthenticated.middleware.js";

router.post('/register', register);
router.post('/login', login);

router.get('/test', isAuthenticated, (req, res) => {
    res.json({ message: "Authenticated route", userId: req.session.userId });
})
export default router;