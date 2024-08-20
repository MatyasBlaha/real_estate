interface VerificationResult {
    isValid: boolean;
}

const validateLoginInput = async (email: string, password: string): Promise<VerificationResult> => {

    if (!email || !password) {
        return { isValid: false };
    }

    return { isValid: true };
};
export default validateLoginInput;
