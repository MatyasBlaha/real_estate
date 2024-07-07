import {useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useParams } from "react-router-dom";

const VerifyEmail = () => {
    const [message, setMessage] = useState('')
    const location = useLocation();
    const params = useParams();

    useEffect(() => {

        const verifyEmail = async () => {
            const token = params.token;
            console.log(token)

            if(!token){
                setMessage('Invalid or expired token. Please try again.')
                return
            };

            try {
                const response = await axios.get(`http://localhost:3000/api/verify/email/${token}`);
                console.log(response)
                console.log(token)
                setMessage(response.data.message)
            } catch (err) {
                if(err.response) {
                    setMessage(err.response.data.message)
                } else {
                    setMessage('An error occurred. Please try again.')
                }
            }
        };

        verifyEmail();

    }, [location, params])

    return(
        <div>
            <h1>test</h1>
            <p>text</p>
            <p>{message}</p>
        </div>
    )
}

export default VerifyEmail;