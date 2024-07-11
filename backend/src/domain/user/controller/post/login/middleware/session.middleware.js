import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import config from '../../../../../../config/mysql.config.js';
import mysql from 'mysql2/promise'

import loadEnvFile from "../../../../../../../env/config.js";
loadEnvFile('.env.security')

const connection = mysql.createPool(config)
const sessionStore = new MySQLStore({}, connection);

const sessionMiddleware = session({
    key: process.env.SESSION_COOKIES_NAME,
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
})


export default sessionMiddleware;

