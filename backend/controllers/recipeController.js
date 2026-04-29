import bcrypt from 'bcrypt';

import * as db from '../db/index.js';

const allRecipesGet = async (req, res) => {
    const result = await db.query(`
        SELECT r.id, r.name, c.name AS category, a.role
        FROM recipes r
        LEFT JOIN categories c ON r.category_id = c.id
        JOIN access_permissions a ON r.id = a.recipe_id AND a.key = $1
        ORDER BY LOWER(c.name) NULLS FIRST,  LOWER(r.name);
        `,
        [req.session.apiKey]
    );
}

const recipeGet = async (req, res) => {
    
}

export default {recipeGet}