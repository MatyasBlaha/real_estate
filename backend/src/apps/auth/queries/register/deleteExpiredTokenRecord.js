import mysql from 'mysql2'
import config from '../../../../config/mysql.config.js'
const pool = mysql.createPool(config);

const deleteExpiredTokenRecord = (tableName, userId, currentTime) => {
    return new Promise((resolve, reject) => {
        const QUERY = `DELETE FROM ${tableName} WHERE user_id = ? AND token_expires_at <= ?`;

        pool.query(QUERY, [userId, currentTime], (err, results) => {
            if(err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

export default deleteExpiredTokenRecord;