import express from 'express';
import isAuthenticated from "../../../../../middleware/isAuthenticated.middleware.js";
const profileProtectedRouter = express.Router();
import upload from "../../../../shared/utils/multer.utils.js";

import { createProfile } from "../../controllers/createProfile.controller.ts";
import { getProfile} from "../../controllers/getProfile.controller.js";
import {checkProfileExistsMiddleware} from "../../middlewares/checkProfileExists.middleware.js";
import {ensureProfileDoesNotExistMiddleware} from "../../middlewares/ensureProfileDoesNotExist.middleware.js";



profileProtectedRouter.get('/check/:profileId', checkProfileExistsMiddleware, getProfile)
profileProtectedRouter.post('/createProfile', isAuthenticated, ensureProfileDoesNotExistMiddleware, upload.single('avatar'), createProfile)


export default profileProtectedRouter;