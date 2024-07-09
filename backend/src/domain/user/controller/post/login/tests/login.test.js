import request from 'supertest';
import express from 'express';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import loadEnvFile from "../../../../../../../env/config.js";
import { login } from '../login.controller.js';
import checkRecordExists from "../../../../../../query/checkRecordExists.query.js";
import updateLastLoginTimeStamp from "../query/updateLastLoginTimeStamp.query.js";
import createJWToken from "../controller/createJWToken.controller.js";

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../../../../../query/checkRecordExists.query.js');
jest.mock('../query/updateLastLoginTimeStamp.query.js');
jest.mock('../controller/createJWToken.controller.js');

const app = express();
app.use(express.json());
app.post('/api/user/login', login);

describe('POST /api/user/login',  () => {
    loadEnvFile('.env.tests')

    const password= process.env.TEST_LOGIN_PASSWORD;
    const salt = bcrypt.genSalt(10)

    const id = process.env.TEST_LOGIN_ID;
    const email= process.env.TEST_LOGIN_EMAIL;
    const hashedPassword =  bcrypt.hash(password, salt);
    const verified = process.env.TEST_LOGIN_VERIFIED;


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

        const response = await request(app).post('/api/user/login').send({email, password});

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('User not found');
    });
})