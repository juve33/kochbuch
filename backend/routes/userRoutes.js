import express from 'express';

import userController from '../controllers/userController.js';

const router = express.Router();

router.route('/new').post(userController.newUserPost);

export default router;