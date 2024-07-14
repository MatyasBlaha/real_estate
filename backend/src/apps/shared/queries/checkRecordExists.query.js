import mysql from 'mysql2'
import config from '../../../config/mysql.config.js'

const pool = mysql.createPool(config);

const checkRecordExists = (tableName, column, value) => {
    return new Promise((resolve, reject) => {
        const QUERY = `SELECT * FROM ${tableName} WHERE ${column} = ?`;

        pool.query(QUERY, [value], (err, results) => {
            if(err) {
                reject(err);
            } else {
                resolve(results.length ? results[0] : null);
            }
        })
    })
}

export default checkRecordExists;