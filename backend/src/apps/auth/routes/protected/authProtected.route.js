import express from 'express';
import isAuthenticated from "../../../../middleware/isAuthenticated.middleware.js";
import {logout} from "../../controllers/logout.controller.ts";
const authProtectedRouter = express.Router();



authProtectedRouter.post('/logout', isAuthenticated, logout)

export default authProtectedRouter;