import React, {useState} from 'react';
import axios from 'axios'

const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        try {
            await axios.post('http://localhost:3000/api/user/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            console.log(formData)
        } catch (err) {

        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <h2>Registration Form</h2>

            <label>
                Email:
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </label>

            <label>
                Password:
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </label>

            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;