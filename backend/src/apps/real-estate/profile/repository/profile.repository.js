import {handleInternalServerError} from "../../../shared/utils/http/handleHttpStatus/handleInternalServerError.js";
import createProfile from "../services/createProfile.service.js";
import insertRecord from "../../../shared/queries/insertRecord.query.js";
import checkRecordExists from "../../../shared/queries/checkRecordExists.query.js";

export const profileRepository = {

    async checkProfileExists(res, userId){
        try {
            const data = userId
            const tableName = 'user_profile';
            const column = 'user_id'

            const profile = await checkRecordExists(tableName, column, data)

            return profile;
        } catch (error) {
            return handleInternalServerError(res, error)
        }
    },


    async saveProfileToDatabase(res, userId, firstName, lastName, descriptionText, mobilePhone){
        try {
            const profile = await createProfile(userId, firstName, lastName, descriptionText, mobilePhone)

            const tableName = 'user_profile'

            await insertRecord(tableName, profile)
            return profile;

        } catch (error) {
            return handleInternalServerError(res, error)
        }
    }
}
