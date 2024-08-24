import React from 'react';


import RegistrationForm from "../Components/Auth/RegistrationForm.tsx";
import { useRegistration } from '../hooks/auth/register/useRegistration.ts'

const Register: React.FC = () => {


        const { register } = useRegistration()

    return (
        <div>
            <h1>Register</h1>
            <RegistrationForm onSubmit={register} />
        </div>
    );
};

export default Register;
