import nodemailer from 'nodemailer';
import loadEnvFile from '../../env/config.js'

loadEnvFile('.env.transporter')
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS,
    }
})

export default transporter;