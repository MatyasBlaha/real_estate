import deleteRecord from "../../../../../../query/deleteRecord.query.js";

const deleteExpiredTokens = async (userId) => {
    const currentTime = new Date();
    await deleteRecord("user_verification_tokens", userId, currentTime);
};

export default deleteExpiredTokens;