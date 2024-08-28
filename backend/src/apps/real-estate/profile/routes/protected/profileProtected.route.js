import express from 'express';
import isAuthenticated from "../../../../../middleware/isAuthenticated.middleware.js";
const profileProtectedRouter = express.Router();

import { createProfile } from "../../controllers/createProfile.controller.ts";
import { getProfile} from "../../controllers/getProfile.controller.js";
import {checkProfileExistsMiddleware} from "../../middlewares/checkProfileExists.middleware.js";
import {ensureProfileDoesNotExistMiddleware} from "../../middlewares/ensureProfileDoesNotExist.middleware.js";



profileProtectedRouter.get('/check/:profileId', checkProfileExistsMiddleware, getProfile)
profileProtectedRouter.post('/createProfile', isAuthenticated, ensureProfileDoesNotExistMiddleware, createProfile)


export default profileProtectedRouter;