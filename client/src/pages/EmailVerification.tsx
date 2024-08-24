import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useEmailVerification } from "../hooks/auth/emailVerification/useEmailVerification.ts";

const EmailVerification = () => {
    const location = useLocation();
    const token = location.pathname.split('/').pop();

    // Use the custom hook
    const { verifyEmail } = useEmailVerification();

    useEffect(() => {
        if (token) {
            verifyEmail(token);
        }
    }, []);

    return (
        <>
            <h2>Email Verification Status</h2>
        </>
    );
};

export default EmailVerification;
