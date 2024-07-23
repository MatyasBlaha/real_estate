import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HandleEmailVerification from "../services/auth/emailVerification/EmailVerification.helper";

const EmailVerification = () => {
    const location = useLocation();
    const token = location.pathname.split('/').pop();

    useEffect(() => {
        HandleEmailVerification(token);
    }, [token]);

    return (
        <>
            <h2>EMAIL VERIFIED</h2>
        </>
    )
}

export default EmailVerification;