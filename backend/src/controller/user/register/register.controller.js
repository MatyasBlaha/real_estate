import HttpStatus from "../../../utils/HttpStatus.js";

export const register = async (req, res) => {
    try {
        const { email, password } = req.body

        if(!email || !password){
            res.status(HttpStatus.NO_CONTENT.code).json(new Response(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, {message: 'no content'}))
        }

        console.log(email)
        console.log(password)

    } catch (err) {

    }
};
