import mysql from 'mysql2'
import config from '../config/mysql.config.js'
import logger from '../apps/shared/log/logger.js';

const connectDB = async () => {
    const pool = mysql.createPool(config);

    pool.getConnection((err, connection) => {
        if(err) {
            logger.error({error: err.message})
        }

        logger.info( "Connected to MySQL database");
        connection.release();
    })
}

export default connectDB;