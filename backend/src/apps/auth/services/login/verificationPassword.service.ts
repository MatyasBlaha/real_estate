import bcrypt from "bcrypt";

interface VerificationResult {
    isValid: boolean;
}

const verificationPassword = async (password: string, userPassword: string): Promise<VerificationResult> => {
    const verifiedPassword = await bcrypt.compare(password, userPassword);
    if(!verifiedPassword){
        return { isValid: false }
    }
    return { isValid: true };
}

export default verificationPassword;