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

        const response = await request(app).post('/api/user/login').send({email, password});

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('User not found');
    });



    it('should respond 401 if user is not verified', async () => {
        const unverifiedUser = {...user, verified: 0};
        checkRecordExists.mockResolvedValue(unverifiedUser);

        const response = await request(app).post('/api/user/login').send({email, password});

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('User is not verified, please check email');
    });



    it('should respond 401 if password is invalid', async () => {
        checkRecordExists.mockResolvedValue(user);
        bcrypt.compare.mockResolvedValue(false);

        const response = await request(app).post('/api/user/login').send({email, password});

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid password');
    });



    it("should respond 500 if JWT is couldn't be create", async () => {
        checkRecordExists.mockResolvedValue(user);
        bcrypt.compare.mockResolvedValue(true);
        createJWToken.mockResolvedValue(false);

        const response = await request(app).post('/api/user/login').send({email, password});

        expect(response.status).toBe(500);
        expect(response.body.message).toBe("Couldn't create JWT token");
    });



    it('should respond 200 if user is successfully logged', async () => {
        checkRecordExists.mockResolvedValue(user);
        bcrypt.compare.mockResolvedValue(true);
        createJWToken.mockResolvedValue(true);
        updateLastLoginTimeStamp.mockResolvedValue(true);

        const response = await request(app).post('/api/user/login').send({email, password});

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login successful');
    });


})