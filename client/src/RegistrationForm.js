import React, {useState} from 'react';
import axios from './services/axios.config'

const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();


            const configuration = {
                method: 'POST',
                url: "/api/user/register",
                data: {
                    email,
                    password
                }
            }

        console.log(configuration.data)

            axios(configuration)
                .then(() => {
                    console.log("registred")
                })

    }


    return (
        <form onSubmit={handleSubmit}>
            <h2>Registration Form</h2>

            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>

            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>

            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;