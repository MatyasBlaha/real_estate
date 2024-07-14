import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import config from '../../../config/mysql.config.js';
import mysql from 'mysql2/promise'

import {cookieOptions} from "../utils/cookie.utils.js";

import loadEnvFile from '../../../../env/config.js';
loadEnvFile('.env.security')

const connection = mysql.createPool(config)
const sessionStore = new MySQLStore({}, connection);

const sessionCookieMiddleware = session({
    key: 'session',
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: cookieOptions
})


export default sessionCookieMiddleware;

