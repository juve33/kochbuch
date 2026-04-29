import express from 'express';

import { requireAuth } from '../src/utils.js';
import recipeController from '../controllers/recipeController.js';

const router = express.Router();

router.route('/all').get(requireAuth(0), recipeController.allRecipesGet);

// router.route('/new').post(requireAuth(0), recipeController.newRecipePost);

// router.route('/:id').get(requireAuth(0), recipeController.recipeGet);
// router.route('/:id').post(requireAuth(0), recipeController.recipePost);

export default router;