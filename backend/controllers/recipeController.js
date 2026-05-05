import bcrypt from 'bcrypt';

import * as db from '../db/index.js';

const allRecipesGet = async (req, res) => {
    const result = await db.query(`
        SELECT r.id, r.name, c.name AS category, a.role
        FROM recipes r
        LEFT JOIN categories c ON r.category_id = c.id
        JOIN access_permissions a ON r.id = a.recipe_id AND a.key = $1
        ORDER BY LOWER(c.name) NULLS FIRST, LOWER(r.name);
        `,
        [req.session.apiKey]
    );

    res.status(200).json(result.rows);
}

const categoriesGet = async (req, res) => {
    const result = await db.query(`
        SELECT *
        FROM categories
        ORDER BY LOWER(name);
        `
    );

    res.status(200).json(result.rows);
}

const newRecipePost = async (req, res) => {
    const { name, category_id, images, ingredients, steps } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Name must not be empty' });
    }
    else if (!ingredients) {
        return res.status(400).json({ message: 'Ingredients must not be empty' });
    }
    else if (!steps) {
        return res.status(400).json({ message: 'Steps must not be empty' });
    }

    const recipe_result = await db.query(category_id ? `
        INSERT INTO recipes (name, category_id)
        VALUES ($1, $2)
        RETURNING id;` : `
        INSERT INTO recipes (name)
        VALUES ($1)
        RETURNING id;`, [name, category_id])
        .catch(err => {
            return res.status(400).json({ message: 'Bad Request' });
        });

    const step_result = await Promise.all(
        steps.map(step =>
            db.query(`
                INSERT INTO steps (recipe_id, index_number, text)
                VALUES ($1, $2, $3)
                RETURNING id;
            `, [recipe_result.rows[0].id, step.index_number, step.text])
        )
    ).catch(err => {
        return res.status(400).json({ message: 'Bad Request' });
    });

    res.status(201).json({ message: 'Recipe created successfully' });
}

const recipeGet = async (req, res) => {
    const { id } = req.params;

    const recipe_data = await db.query(`
        SELECT r.id, r.name, c.name AS category_name, a.role
        FROM recipes r
        LEFT JOIN categories c ON r.category_id = c.id
        JOIN access_permissions a ON r.id = a.recipe_id AND a.key = $1;
        WHERE r.id = $2
        `,
        [req.session.apiKey, id]
    );

    if (recipe_data.rowCount = 0) {
        return res.status(400).json({ error: 'Recipe not found or not permitted to access' });
    }

    const images_data = await db.query(`
        SELECT i.id, ri.slot, ri.caption, i.location
        FROM images i
        JOIN recipe_images ri ON i.id = ri.image_id
        WHERE ri.recipe_id = $1
        `,
        [id]
    );

    const ingredients_data = await db.query(`
        SELECT id, amount, unit, text, comment, step_id
        FROM ingredients
        WHERE recipe_id = $1
        `,
        [id]
    );

    const steps_data = await db.query(`
        SELECT id, index_number, text
        FROM steps
        WHERE recipe_id = $1
        ORDER BY index_number ASC;
        `,
        [id]
    );

    res.status(200).json({
        "id": recipe_data.rows[0].id,
        "name": recipe_data.rows[0].name,
        "category_name": recipe_data.rows[0].category_name,
        "images": images_data.rows,
        "ingredients": ingredients_data.rows,
        "steps": steps_data.rows
    });
}

export default {allRecipesGet, categoriesGet, recipeGet}