import jwt from 'jsonwebtoken';
import loadEnvFile from '../../../../../../../env/config.js'

const createJWToken = (userId, email, res) => {
    loadEnvFile('.env.security')

    const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN

    const token = jwt.sign({id: userId, email: email}, JWT_SECRET_TOKEN, {expiresIn: '1h'});
    res.cookie('token', token, {httpOnly: true, secure: true});


    return token;
}

export default createJWToken;