import crypto from "crypto";
import sendVerificationEmail from "../../../../utils/email/sendVerificationEmail.utils.js";
import insertRecord from "../../../../../../query/insertRecord.query.js";
import checkRecordExists from "../../../../../../query/checkRecordExists.query.js";
import deleteExpiredTokens from "./deleteExpiredTokens.controller.js";

const createVerificationToken = async (userId) => {

    const existsToken = await checkRecordExists("user_verification_tokens", "user_id", userId);

    if(existsToken){
        await deleteExpiredTokens(userId);
    }


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