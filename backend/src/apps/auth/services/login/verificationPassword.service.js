import bcrypt from "bcrypt";

import HttpsStatus from '../../../shared/utils/http/HttpStatus.utils.ts'

const verificatePassword = async (password, userPassword) => {
     const verifiedPassword = await bcrypt.compare(password, userPassword);
     if(!verifiedPassword){
         return {
             error: {
                 status: HttpsStatus.UNAUTHORIZED.status,
                 code: HttpsStatus.UNAUTHORIZED.code,
                 message: 'Invalid password',
                 data: null
             }
         }
     }
    return { isValid: true };
}

export default verificatePassword;