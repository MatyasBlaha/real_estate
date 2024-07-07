import crypto from "crypto";
import sendVerificationEmail from "../../../../utils/email/sendVerificationEmail.utils.js";
import insertRecord from "../../../../../../query/insertRecord.query.js";

const createVerificationToken = async (userId) => {
    const token = crypto.randomBytes(64).toString('hex');

    const userVerificationToken = {
        user_id: userId,
        verification_token: token,
        token_created_at: new Date(),
        token_expires_at: new Date(Date.now() + 3600000)
    };

    await insertRecord("user_verification_tokens", userVerificationToken);

    return token;
}

export default createVerificationToken;