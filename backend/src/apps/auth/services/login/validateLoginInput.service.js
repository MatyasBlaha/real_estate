import HttpsStatus from '../../../shared/utils/http/HttpStatus.utils.ts'

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

    return { isValid: true };
};
export default validateLoginInput;
