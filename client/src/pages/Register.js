import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/UserContext.tsx';

import RegisterForm from "../Components/Auth/RegistrationForm";

import {getUsernameFromCookies} from "../utils/cookieUtils";
import { handleRegistration } from '../services/auth/register/register.helper'

const Register = () => {


    const handleSubmit = async (credentials) => {
        await handleRegistration(credentials);
    };

    return (
        <div>
            <h1>Register</h1>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
};

export default Register;
