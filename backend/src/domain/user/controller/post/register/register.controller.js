import HttpStatus from "../../../../../utils/HttpStatus.utils.js";
import Response from "../../../../../models/response.js";
import checkRecordExists from "../../../../../query/checkRecordExists.query.js";

import sendVerificationEmail from "../../../utils/email/sendVerificationEmail.utils.js";
import createUser from "./controller/createUser.controller.js";
import createVerificationToken from "./controller/createVerificationToken.controller.js";

export const register = async (req, res) => {

    try {

        // Extract email and password from request body
        const { email, password } = req.body

        console.log(email, password)


        // Validate input data
        if(!email || !password){
            res.status(HttpStatus.NO_CONTENT.code).json(new Response(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, 'No content', null))
            return;
        }

        // CHECK IF USER ALREADY EXISTS  (if true, send verification email, else create user)
        const userAlreadyExists = await checkRecordExists("users", "email", email)
        console.log(userAlreadyExists)

        // If user already exists, send verification email, else create user and create verification token
        if(userAlreadyExists){
            // res.status(HttpStatus.CONFLICT.code).json(new Response(HttpStatus.CONFLICT.code, HttpStatus.CONFLICT.status, 'User already exists', null))


            // If user is already verified, respond with success message, else send verification email
            if(userAlreadyExists.verified === 1){
                res.status(HttpStatus.OK.code).json(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'User si already verified, Login', null))
            } else {
                const token = await createVerificationToken(userAlreadyExists.id)
                await sendVerificationEmail(email, token);
                res.status(HttpStatus.OK.code).json(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'User is already exists, verification email resent', null))
            }


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