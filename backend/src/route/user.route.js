import express from 'express';
const router = express.Router()

import {register} from "../controller/user/register/register.controller.js";

router.post('/register', register);
router.post('/login', login);


export default router;