import HttpsStatus from '../../../shared/utils/HttpStatus.utils.js'

const validateLoginInput = (email, password) => {

    // Validate input
    if (!email || !password) {
       return {
           error: {
               status: HttpsStatus.UNAUTHORIZED.status,
               code: HttpsStatus.UNAUTHORIZED.code,
               message: 'Email and password are required',
               data: null
           }
       }
    }

    // Validate email format
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

    // Validate password length
    if (password.length < 8) {
        return {
            error: {
                status: HttpsStatus.UNAUTHORIZED.status,
                code: HttpsStatus.UNAUTHORIZED.code,
                message: 'Password must be at least 8 characters long',
                data: null
            }
        }
    }

    return { isValid: true };
};
export default validateLoginInput;
