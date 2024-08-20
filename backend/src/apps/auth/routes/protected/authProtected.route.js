import express from 'express';
import isAuthenticated from "../../middleware/isAuthenticated.middleware.js";
import {logout} from "../../controllers/logout.controller.ts";
const protectedRouter = express.Router();


protectedRouter.get('/test', isAuthenticated, (req, res) => {
    res.json({ message: "Authenticated route", userId: req.session.userId });
})


protectedRouter.post('/logout', isAuthenticated, logout)

export default protectedRouter;