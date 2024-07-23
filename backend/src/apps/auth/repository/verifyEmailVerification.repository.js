import checkRecordExists from "../../shared/queries/checkRecordExists.query.js";


const verifyEmailVerificationRepository = {
    async checkIfVerificationTokenExists (token) {
        try {
            const tableName = 'user_verification_tokens'
            const column = 'verification_token'
            const data = token

            const verifiedToken = await checkRecordExists(tableName, column, data)
            return verifiedToken
        } catch (err) {
            throw new Error(`Error checking if verification token exists: ${err.message}`)
        }
    },

}

export default verifyEmailVerificationRepository;