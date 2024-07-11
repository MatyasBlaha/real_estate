import request from 'supertest';
import express from 'express';
import session from 'express-session';
import bcrypt from "bcrypt";
import loadEnvFile from "../../../../../../../env/config.js";
import { login } from '../login.controller.js';
import checkRecordExists from "../../../../../../query/checkRecordExists.query.js";
import updateLastLoginTimeStamp from "../query/updateLastLoginTimeStamp.query.js";

jest.mock('bcrypt');
jest.mock('../../../../../../query/checkRecordExists.query.js');
jest.mock('../query/updateLastLoginTimeStamp.query.js');

const app = express();
app.use(express.json());

// Use an in-memory session store for testing
app.use(session({
    secret: 'test_secret',
    resave: false,
    saveUninitialized: false
}));

app.post('/api/user/login', login);

describe('POST /api/user/login', () => {
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

    it('should respond 401 if user does not exist', async () => {
        checkRecordExists.mockResolvedValue(null);

        const response = await request(app).post('/api/user/login').send({ email, password });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('User not found');
    });

    it('should respond 401 if user is not verified', async () => {
        const unverifiedUser = { ...user, verified: 0 };
        checkRecordExists.mockResolvedValue(unverifiedUser);

        const response = await request(app).post('/api/user/login').send({ email, password });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('User is not verified, please check email');
    });

    it('should respond 401 if password is invalid', async () => {
        checkRecordExists.mockResolvedValue(user);
        bcrypt.compare.mockResolvedValue(false);

        const response = await request(app).post('/api/user/login').send({ email, password });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid password');
    });

    it('should respond 200 if user is successfully logged in', async () => {
        checkRecordExists.mockResolvedValue(user);
        bcrypt.compare.mockResolvedValue(true);
        updateLastLoginTimeStamp.mockResolvedValue(true);

        const agent = request.agent(app); // Use agent to handle cookies

        const response = await agent.post('/api/user/login').send({ email, password });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login successful');

        // Check if session userId is set
        agent.get('/api/user/profile')
            .expect(200)
            .expect((res) => {
                if (!res.body.userId) throw new Error("Missing userId in session");
            });
    });
});
