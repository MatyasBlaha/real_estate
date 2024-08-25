import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import {getUsernameFromCookies} from "../cookieUtils.ts";

interface ProtectedRouteProps {
    element: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const session = getUsernameFromCookies();

    if (session) {
        return element;
    } else {
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;
