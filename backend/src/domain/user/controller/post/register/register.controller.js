
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import HttpStatus from "../../../../../utils/HttpStatus.utils.js";
import Response from "../../../../../models/response.js";
import checkRecordExists from "../../../../../query/checkRecordExists.query.js";
import insertRecord from "../../../../../query/insertRecord.query.js";

import sendVerificationEmail from "../../../utils/email/sendVerificationEmail.utils.js";
import createUser from "./controller/createUser.controller.js";
import createVerificationToken from "./controller/createVerificationToken.controller.js";

export const register = async (req, res) => {

    try {

        // Extract email and password from request body
        const { email, password } = req.body


        // Validate input data
        if(!email || !password){
            res.status(HttpStatus.NO_CONTENT.code).json(new Response(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, 'No content', null))
            return;
        }

        // CHECK IF USER ALREADY EXISTS  (if true, send verification email, else create user)
        const userAlreadyExists = await checkRecordExists("users", "email", email)


        // If user already exists, send verification email, else create user and create verification token
        if(userAlreadyExists){
            res.status(HttpStatus.CONFLICT.code).json(new Response(HttpStatus.CONFLICT.code, HttpStatus.CONFLICT.status, 'createUser already exists', null))

            const token = await createVerificationToken(userAlreadyExists.id)
            await sendVerificationEmail(email, token);
        } else {

            // Controller to create User and create verification token
            const user = await createUser(email, password)
            const token = await createVerificationToken(user.id)
            await sendVerificationEmail(user.email, token);
            res.status(HttpStatus.CREATED.code).json(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'createUser created successfully', user))
        }

    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'internal server error', null))
    }
};