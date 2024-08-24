import { emailVerification } from "./emailVerificationService.ts";
import {EmailVerificationResult, SetError} from "./emailVerificationTypes";

export const handleEmailVerification = async (token: string, setError: SetError): Promise<EmailVerificationResult> => {

    try {

        const result = await emailVerification(token)

        if (result.statusCode !== 200 && result.statusCode !== 201) {
            return { type: 'error', message: result.message };
        }

        return { type:'success', message: result.message };


    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Couldn't verify email"
        setError(errorMsg)
        return { type: 'error', message: errorMsg}
    }
};
