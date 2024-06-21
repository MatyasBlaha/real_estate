import express from 'express';
import {registerUser} from "../controller/user/register.controller.js";
import { body } from 'express-validator';
import { uploads } from '../utils/storage.js'

const userRoutes = express.Router();

userRoutes.post('/register', uploads.single('avatar'), [
    body('email').isEmail().withMessage('email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters long'),
    body('username').isLength({ min: 3 }).withMessage('username is required')
], registerUser)

export default userRoutes;