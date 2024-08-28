import {handleInternalServerError} from "../../../shared/utils/http/handleHttpStatus/handleInternalServerError.js";
import createProfile from "../services/createProfile.service.js";
import insertRecord from "../../../shared/queries/insertRecord.query.js";
import checkRecordExists from "../../../shared/queries/checkRecordExists.query.js";

export const profileRepository = {

    async checkUserExists(res, userId) {
       try {
           const tableName = 'users';
           const column = 'id';
           const data = userId;

           const user = await checkRecordExists(tableName, column, data)
           return user;
       } catch (error) {
            return handleInternalServerError(res, error)
       }
    },

    async checkProfileExists(res, profileId){
        try {
            const tableName = 'user_profile';
            const column = 'id'
            const data = profileId

            const profile = await checkRecordExists(tableName, column, data)
            console.log(profile)

            return profile;
        } catch (error) {
            return handleInternalServerError(res, error)
        }
    },

    async checkProfileExistsWithUserId(res, userId) {
        try {
            const tableName = 'user_profile';
            const column = 'user_id'
            const data = userId

            const profile = await checkRecordExists(tableName, column, data)

            if(profile){
                return profile
            } else {
                return null
            }

        } catch (error) {
            return handleInternalServerError(res, error)
        }
    },


    async saveProfileToDatabase(res, userId, firstName, lastName, descriptionText){
        try {
            const profile = await createProfile(userId, firstName, lastName, descriptionText)

            const tableName = 'user_profile'

            await insertRecord(tableName, profile)
            return profile;

        } catch (error) {
            return handleInternalServerError(res, error)
        }
    }
}
