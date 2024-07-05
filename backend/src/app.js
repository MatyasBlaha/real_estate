import express from 'express';
import cors from 'cors';
import Response from './domain/response.js';
import HttpStatus from "./utils/HttpStatus.js";
import estateRoutes from "./route/estate.route.js";
import userRoute from "./route/user.route.js";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors());

app.use('/estate', estateRoutes);
app.use('/user', userRoute);

app.get('/', (req, res) => {
    res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'realEstate API - v1.0.0'));
});

app.all('*', (req, res) => {
    res.status(HttpStatus.NOT_FOUND.code)
        .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Route does not exist on the server'));
});

export default app;
