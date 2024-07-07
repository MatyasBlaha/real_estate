import express from 'express';

const router = express.Router();

import verifyEmailVerification from '../domain/user/controller/post/register/controller/email/verifyEmailVerification.controller.js'

router.get('/email/:token', verifyEmailVerification)

export default router;