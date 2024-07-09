import express from 'express';
import cors from 'cors';
import connectDB from './database/database.js';
import Response from './models/response.js';
import HttpStatusUtils from "./utils/HttpStatus.utils.js";
import estateRoutes from "./route/estate.route.js";
import userRoute from "./domain/user/route/user.route.js";
import verifyRoute from "./route/verify.route.js";

const app = express();

app.use(cors({
    origin: 'http://localhost:3001', // Update to match your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies if needed
}));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/estate', estateRoutes);
app.use('/api/user', userRoute);
app.use('/api/verify', verifyRoute);

connectDB();

app.get('/', (req, res) => {
    res.send(new Response(HttpStatusUtils.OK.code, HttpStatusUtils.OK.status, 'realEstate API - v1.0.0'));
});

app.all('*', (req, res) => {
    res.status(HttpStatusUtils.NOT_FOUND.code)
        .send(new Response(HttpStatusUtils.NOT_FOUND.code, HttpStatusUtils.NOT_FOUND.status, 'Route does not exist on the server'));
});

export default app;
