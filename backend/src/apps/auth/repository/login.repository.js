import HttpStatus from '../../shared/utils/HttpStatus.utils.js';

import checkRecordExists from '../../shared/queries/checkRecordExists.query.js';
import updateLastLoginTimeStampQuery from '../queries/updateLastLoginTimeStamp.query.js';

const checkUserExistenceAndVerification = async (email) => {

    const tableName = 'users'
    const column = 'email'

  const user = await checkRecordExists(tableName, column, email);
  if (!user) {
      return {
          error: {
              status: HttpStatus.UNAUTHORIZED.status,
              code: HttpStatus.UNAUTHORIZED.code,
              message: 'User not found',
              data: null
          }
      }
  } else {
      return user;
  }
};


const updateLastLoginTimeStamp = async (userId) => {

    const tableName = 'users'
    const column = 'last_login'

    await updateLastLoginTimeStampQuery(tableName, column, userId);
}

export {checkUserExistenceAndVerification, updateLastLoginTimeStamp}