// import database from '../config/mysql.config.js';
// import QUERY_EMAIL from '../query/email/email.query.js';
// import HttpStatus from '../utils/HttpStatus.js';
// import Response from '../domain/response.js';
// import bcrypt from 'bcrypt';
// import logger from '../log/logger.js';
//
// export const checkEmailExists = async (req, res) => {
//     console.log(req.body)
//     const { email, password } = req.body;
//     console.log(email, password);
//     const userRoleId = process.env.ROLE_USER_ID;
//     const hashLength = 10;
//
//     try {
//         const hashedPassword = await bcrypt.hash(password, hashLength);
//
//         const connection = await database.getConnection();
//         await connection.beginTransaction();
//
//         const [user] = await connection.query(QUERY_EMAIL.CHECK_EMAIL_EXISTS, [email]);
//
//         console.log(user)
//     } catch (err) {
//         logger.error(err);
//         res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json(
//             new Response(
//                 HttpStatus.INTERNAL_SERVER_ERROR.code,
//                 HttpStatus.INTERNAL_SERVER_ERROR.status,
//                 err.message
//             )
//         );
//     }
// };
