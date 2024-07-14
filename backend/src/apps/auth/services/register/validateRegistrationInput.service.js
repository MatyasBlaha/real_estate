import HttpStatus from '../../../shared/utils/HttpStatus.utils.js';
import HttpsStatus from "../../../shared/utils/HttpStatus.utils.js";

const validateRegisterInput = (firstName, lastName, email, password) => {
    if (!firstName || !lastName || !email || !password) {
        return {
            error: {
                status: HttpStatus.NO_CONTENT.status,
                code: HttpStatus.NO_CONTENT.code,
                message: 'All fields are required',
                data: null
            }
        }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            error: {
                status: HttpsStatus.UNAUTHORIZED.status,
                code: HttpsStatus.UNAUTHORIZED.code,
                message: 'Invalid email format',
                data: null
            }
        }
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return {
            error: {
                status: HttpsStatus.UNAUTHORIZED.status,
                code: HttpsStatus.UNAUTHORIZED.code,
                message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                data: null
            }
        }
    }

    return { isValid: true };
}

export default validateRegisterInput;