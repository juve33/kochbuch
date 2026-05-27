import express from 'express';

import { requireAuth } from '../src/utils.js';
import recipeController from '../controllers/recipeController.js';

const router = express.Router();

router.route('/all').get(requireAuth(0), recipeController.allRecipesGet);

router.route('/categories').get(requireAuth(0), recipeController.categoriesGet);
router.route('/categories').post(requireAuth(0), recipeController.categoriesPost);

router.route('/new').post(requireAuth(0), recipeController.newRecipePost);

router.route('/:id').get(requireAuth(0), recipeController.recipeGet);
// router.route('/:id').post(requireAuth(0), recipeController.recipePost);

export default router;