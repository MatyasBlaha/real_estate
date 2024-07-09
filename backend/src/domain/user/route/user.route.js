import express from 'express';
const router = express.Router()

import { register } from "../controller/post/register/register.controller.js";
import { login } from "../controller/post/login/login.controller.js"

router.post('/register', register);
router.post('/login', login);


export default router;