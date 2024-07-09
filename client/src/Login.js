import axios from './services/axios.config';
import {useState} from "react";


const Login = () => {

    const [email, setEmail ] = useState('')
    const [password, setPassword ] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const configuration = {
            method: 'POST',
            url: '/api/user/login',
            data: {
                email,
                password
            }
        }

        axios(configuration)
            .then(() => {
                console.log("Logged in")
            })

    }



    return(
        <div>
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Login;