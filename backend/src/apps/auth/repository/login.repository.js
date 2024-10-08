import HttpStatus from '../../shared/utils/http/HttpStatus.utils.ts';

import checkRecordExists from '../../shared/queries/checkRecordExists.query.js';
import updateLastLoginTimeStampQuery from '../queries/updateLastLoginTimeStamp.query.js';

const checkUserExistenceAndVerification = async (email) => {

    const tableName = 'users'
    const column = 'email'

  const user = await checkRecordExists(tableName, column, email);
  if (!user) {
      console.log(user)
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