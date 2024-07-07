import mysql from "mysql2";
import config from '../config/mysql.config.js'
const pool = mysql.createPool(config);

const updateVerified = (tableName, userId) => {
    return new Promise((resolve, reject) => {
        const QUERY = `UPDATE ${tableName} SET verified = TRUE WHERE id = ?`

        pool.query(QUERY, [userId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

export default updateVerified;