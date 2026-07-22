import express from 'express';

import { requireAuth } from '../src/utils.js';
import userController from '../controllers/userController.js';

const router = express.Router();

router.route('/').post(requireAuth(10), userController.newUserPost);

router.route('/share').get(requireAuth(0), userController.innerApiKeysGet);

router.route('/me').get(requireAuth(0), userController.meGet);
router.route('/me').post(requireAuth(0), userController.mePost);

export default router;