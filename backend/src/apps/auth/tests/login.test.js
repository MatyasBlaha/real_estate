import request from 'supertest';
import express from 'express';
import session from 'express-session';
import bcrypt from "bcrypt";
import loadEnvFile from '../../../../env/config.js';
import { login } from '../controllers/login.controller.ts';
import checkRecordExists from '../../shared/queries/checkRecordExists.query.js';
import validateLoginInput from "../services/login/validateLoginInput.service.ts";
import verificatePassword from "../services/login/verificationPassword.service.ts";
import updateLastLoginTimeStamp from '../../shared/queries/updateRecord.query.js';
import {setSessionAndCookies} from "../utils/cookie.utils.js";

jest.mock('bcrypt');
jest.mock('../services/login/validateLoginInput.service.ts')
jest.mock('../../shared/queries/checkRecordExists.query.js');
jest.mock('../../shared/queries/updateRecord.query.js');
jest.mock('../services/login/verificationPassword.service.ts')
jest.mock('../utils/cookie.utils.js')

const app = express();
app.use(express.json());

// Use an in-memory session store for testing
app.use(session({
    secret: 'test_secret',
    resave: false,
    saveUninitialized: false
}));

app.post('/api/user/public/login', login);

describe('POST /api/user/public/login', () => {
    loadEnvFile('.env.tests');

    const password = process.env.TEST_LOGIN_PASSWORD;
    const salt = bcrypt.genSaltSync(10); // Use synchronous version for proper hashing in test setup
    const id = process.env.TEST_LOGIN_ID;
    const email = process.env.TEST_LOGIN_EMAIL;
    const hashedPassword = bcrypt.hashSync(password, salt); // Use synchronous version for proper hashing in test setup
    const verified = 1;

    const user = {
        id: id,
        email: email,
        password: hashedPassword,
        verified: verified,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('should respond 401 if user does not exist', async () => {
        checkRecordExists.mockResolvedValue(null);

        validateLoginInput.mockResolvedValue({isValid: true});

        const response = await request(app).post('/api/user/public/login').send({ email, password });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('User not found');
    });

    it('should respond 401 if user is not verified', async () => {
        const unVerifiedUser = { ...user, verified: 0 };
        checkRecordExists.mockResolvedValue(unVerifiedUser);

        validateLoginInput.mockResolvedValue({isValid: true});

        const response = await request(app).post('/api/user/public/login').send({ email, password });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('User is not verified, please check email');
    });

    it('should respond 401 if password is invalid', async () => {
        const invalidPasswordResponse = {
            error: {
                status: 401,
                code: 401,
                message: 'Invalid password',
                data: null
            }
        };
        verificatePassword.mockResolvedValue(invalidPasswordResponse);

        validateLoginInput.mockResolvedValue({ isValid: true });
        checkRecordExists.mockResolvedValue(user);

        const response = await request(app).post('/api/user/public/login').send({ email, password });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid password');
    });

    it('should respond 200 if user is successfully logged in', async () => {
        validateLoginInput.mockResolvedValue({ isValid: true });
        checkRecordExists.mockResolvedValue(user);
        verificatePassword.mockResolvedValue({ isValid: true });
        updateLastLoginTimeStamp.mockResolvedValue(true);
        setSessionAndCookies.mockResolvedValue(true)

        const agent = request.agent(app); // Use agent to handle cookies

        const response = await agent.post('/api/user/public/login').send({ email, password });

        console.log('Response:', response); // Add some logging to see what's happening

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login successful');

        // Check if session userId is set
        agent.get('/api/user/profile')
            .expect(200)
            .expect((res) => {
                if (!res.body.userId) throw new Error('Expected userId to be set in session');
            });
    });
});
