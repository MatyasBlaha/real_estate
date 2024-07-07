import express from 'express';

const router = express.Router();

import verifyEmailVerification from '../controller/email/verify/verifyEmailVerification.controller.js'

router.get('/email/:token', verifyEmailVerification)

export default router;