import React, {useState} from 'react';
import axios from 'axios'

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('avatar', avatar);

        try {
            await axios.post('http://localhost:3000/user/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            console.log(formData)
        } catch (err) {

        }
    }

    const handleAvatarChange = (event) => {
        setAvatar(event.target.files[0]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registration Form</h2>
            <label>
                Username:
                <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} required />
            </label>

            <label>
                Email:
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </label>

            <label>
                Password:
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </label>

            <label>
                Avatar:
                <input type="file" onChange={handleAvatarChange} required />
            </label>

            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;