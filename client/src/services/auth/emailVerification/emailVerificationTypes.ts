
export type SetError = (err: string) => void;

export type EmailVerificationResult = {
    type: 'success' | 'error';
    message: string;
};
