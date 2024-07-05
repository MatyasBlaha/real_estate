import express from 'express';
// import {checkEmailExists} from "../middleware/checkEmailExists.middleware.js";
import {register} from "../controller/user/register/register.controller.js";
const router = express.Router()

router.post('/register', register);


export default router;