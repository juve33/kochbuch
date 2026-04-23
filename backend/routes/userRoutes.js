import express from 'express';

import { requireAuth } from '../src/utils.js';
import userController from '../controllers/userController.js';

const router = express.Router();

router.route('/new').post(requireAuth(0), userController.newUserPost);

export default router;