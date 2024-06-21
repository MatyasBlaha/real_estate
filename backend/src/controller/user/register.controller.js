import database from '../../config/mysql.config.js';
import Response from '../../domain/response.js';
import logger from '../../log/logger.js';
import HttpStatus from '../../utils/HttpStatus.js';
import QUERY from '../../query/user/register.query.js';
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) => {

    const hashLength = 10;
    const avatar = req.file ? `/data/user-avatar/${req.file.filename}` : null;


    const { username, email, password } = req.body;
    const avatar_url = avatar

    try {

        if (req.file) {
            logger.info(`File uploaded: ${req.file.filename}`);
        } else {
            logger.info('No file uploaded');
        }

        const hashedPassword = await bcrypt.hash(password, hashLength);

        const connection = await database.getConnection();
        await connection.beginTransaction();

        const [ user ] = await connection.query(QUERY.CREATE_USER, [ username, email, hashedPassword ]);
        const userId = user.insertId;

        if(avatar_url) {
            await connection.query(QUERY.ADD_USER_AVATAR, [userId, avatar_url]);
        };

        await connection.commit();
        connection.release();

        logger.info('User registered successfully');
        res.status(HttpStatus.CREATED.code).json(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, {userId}));


    } catch (err) {
        logger.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, err.message))
    }
}