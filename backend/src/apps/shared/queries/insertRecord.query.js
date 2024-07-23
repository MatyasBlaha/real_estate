import mysql from "mysql2";
import config from '../../../config/mysql.config.js'
const pool = mysql.createPool(config);

const insertRecord = (tableName, record) => {
    return new Promise((resolve, reject) => {

        const QUERY = `INSERT INTO ${tableName} SET ?`

        pool.query(QUERY, [record], (err, results) => {
            if(err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

export default insertRecord;