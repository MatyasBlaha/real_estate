import crypto from 'crypto';

const createVerificationToken = (user) => {

    const userId = user.id;
    const token = crypto.randomBytes(64).toString('hex');
    const tokenCreated = new Date();
    const tokenExpiresAt = new Date(tokenCreated.getTime() + 1000 * 60 * 60);


    const verificationToken = {
        user_id: userId,
        verification_token: token,
        token_created_at: tokenCreated,
        token_expires_at: tokenExpiresAt
    }

    return verificationToken;
};

export default createVerificationToken;