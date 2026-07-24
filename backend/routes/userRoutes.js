import express from 'express';

import { requireAuth } from '../src/utils.js';
import userController from '../controllers/userController.js';

const router = express.Router();

router.route('/').get(requireAuth(0), userController.allUsersGet);
router.route('/').post(requireAuth(0), userController.newUserPost);

router.route('/share').get(requireAuth(0), userController.innerApiKeysGet);

router.route('/me').get(requireAuth(0), userController.meGet);
router.route('/me').post(requireAuth(0), userController.mePost);

router.route('/:id').delete(requireAuth(0), userController.userDelete);
router.route('/:id').post(requireAuth(0), userController.userPost);

export default router;