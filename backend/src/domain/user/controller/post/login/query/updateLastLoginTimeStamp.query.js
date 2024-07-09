import mysql from "mysql2";
import config from '../../../../../../config/mysql.config.js'

const pool = mysql.createPool(config);

const updateLastLoginTimeStamp = (tableName, column, value) => {
    return new Promise((resolve, reject) => {
        const QUERY = `UPDATE ${tableName} SET ${column} = CURRENT_TIMESTAMP WHERE id = ?`;

        pool.query(QUERY, [value], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })


    })
}

export default updateLastLoginTimeStamp;