import transporter from '../../../../utils/transporter.utils.js'
import loadEnvFile from '../../../../../env/config.js'

loadEnvFile('.env.transporter')


const emailFrom = process.env.AUTH_USER
const emailSubject = 'Email verification';

const sendVerificationEmail = async (email, token) => {
    const verificationLink = `http://localhost:3001/verify/email/${token}`;
    console.log('email sent verification');
    const mailOptions = {
        from: emailFrom,
        to: email,
        subject: emailSubject,
        text: `Please verify your email by clicking on the following link: ${verificationLink}`
    };

    console.log(emailFrom)
    console.log(email)

    await transporter.sendMail(mailOptions)
}

export default sendVerificationEmail;