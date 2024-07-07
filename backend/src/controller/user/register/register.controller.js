import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import HttpStatus from "../../../utils/HttpStatus.utils.js";
import Response from "../../../domain/response.js";
import checkRecordExists from "../../../query/checkRecordExists.query.js";
import insertRecord from "../../../query/insertRecord.query.js";

import sendVerificationEmail from "./email/sendVerificationEmail.controller.js";

export const register = async (req, res) => {

    try {
        const { email, password } = req.body

        if(!email || !password){
            res.status(HttpStatus.NO_CONTENT.code).json(new Response(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, 'No content', null))
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const token = crypto.randomBytes(64).toString('hex');

        const user = {
            id: uuidv4(),
            email: email,
            password: hashedPassword
        };

        const userVerificationToken = {
            user_id: user.id,
            verification_token: token,
            token_created_at: new Date(),
            token_expires_at: new Date(Date.now() + 3600000)
        }

        const userAlreadyExists = await checkRecordExists("users", "email", email)

        if(userAlreadyExists){
            res.status(HttpStatus.CONFLICT.code).json(new Response(HttpStatus.CONFLICT.code, HttpStatus.CONFLICT.status, 'user already exists', null))
        } else {
            await insertRecord("users", user);
            await insertRecord("user_verification_tokens", userVerificationToken)
            await sendVerificationEmail(user.email, token);
            res.status(HttpStatus.CREATED.code).json(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'user created successfully', user))
        }

    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'internal server error', null))
    }
};