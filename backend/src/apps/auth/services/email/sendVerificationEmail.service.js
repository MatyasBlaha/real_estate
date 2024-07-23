import transporter from '../../../shared/utils/transporter.utils.js'
import loadEnvFile from '../../../../../env/config.js'

loadEnvFile('.env.transporter')


const emailFrom = process.env.AUTH_USER
const emailSubject = 'Email verification';

const sendVerificationEmail = async (email, token) => {
    const verificationToken = token.verification_token
    const verificationLink = `http://localhost:3001/verify/email/${verificationToken}`;
    const mailOptions = {
        from: emailFrom,
        to: email,
        subject: emailSubject,
        text: `Please verify your email by clicking on the following link: ${verificationLink}`
    };


    await transporter.sendMail(mailOptions)
}

export default sendVerificationEmail;