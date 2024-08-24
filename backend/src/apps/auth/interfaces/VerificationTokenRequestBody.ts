export interface VerifiedToken {
    user_id: string;
    verification_token: string;
    token_created_at: Date;
    token_expires_at: Date;
}