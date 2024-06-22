import express from 'express';
import ip from 'ip';
import loadEnvFile from "../env/config.js";
import cors from 'cors';
import Response from './domain/response.js';
import logger from './log/logger.js'
import HttpStatus from "./utils/HttpStatus.js";
import estateRoutes from "./route/estate.route.js";
import userRoute from "./route/user.route.js";

loadEnvFile('.env.config')
const PORT = process.env.SERVER_PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.use('/estate', estateRoutes)
app.use('/user', userRoute);
app.get('/', (req, res) => {
    res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'realEstate API - v1.0.0'))
});
app.all('*', (req, res) => {
    res.status(HttpStatus.NOT_FOUND.code)
        .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Route does not exist on the server'))
});
app.listen(PORT, () => logger.info(`Server running on: ${ip.address()}:${PORT}`));