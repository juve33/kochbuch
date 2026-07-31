import bcrypt from 'bcrypt';

import * as db from '../db/index.js';

export async function init() {
    return new Promise((acc, rej) => {
        db.query(`
            CREATE EXTENSION IF NOT EXISTS pgcrypto;
            
            CREATE TABLE IF NOT EXISTS users (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name VARCHAR(32) UNIQUE NOT NULL,
                password_hash VARCHAR(60) NOT NULL,
                role INT NOT NULL DEFAULT 0,
                setting_theme_slug VARCHAR(32),
                setting_advanced_options bool DEFAULT false
            );

            CREATE TABLE IF NOT EXISTS categories (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name VARCHAR(32) UNIQUE NOT NULL
            );

            CREATE TABLE IF NOT EXISTS recipes (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name VARCHAR(64) NOT NULL,
                category_id INT,
                servings INT,
                duration INT,
                FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
            );

            CREATE TABLE IF NOT EXISTS steps (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                recipe_id INT NOT NULL,
                index_number INT NOT NULL,
                text TEXT NOT NULL,
                FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
                UNIQUE (recipe_id, index_number) DEFERRABLE INITIALLY DEFERRED
            );

            CREATE TABLE IF NOT EXISTS ingredients (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                recipe_id INT NOT NULL,
                index_number INT NOT NULL,
                step_id INT,
                amount NUMERIC,
                unit VARCHAR(16),
                text VARCHAR(64) NOT NULL,
                comment TEXT,
                FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
                FOREIGN KEY (step_id) REFERENCES steps(id) ON DELETE SET NULL,
                UNIQUE (recipe_id, index_number) DEFERRABLE INITIALLY DEFERRED
            );
            
            CREATE TABLE IF NOT EXISTS api_keys_inner (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                key_hash varchar(60) UNIQUE,
                user_id INT UNIQUE,
                name VARCHAR(32) UNIQUE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );

            CREATE OR REPLACE FUNCTION create_inner_api_key_for_user()
                RETURNS trigger AS $$
                BEGIN
                    INSERT INTO api_keys_inner (user_id)
                    VALUES (NEW.id);

                    RETURN NEW;
                END;
                $$ LANGUAGE plpgsql;
            
            CREATE OR REPLACE TRIGGER users_after_insert
                AFTER INSERT ON users
                FOR EACH ROW
                EXECUTE FUNCTION create_inner_api_key_for_user();
            
            CREATE TABLE IF NOT EXISTS api_keys_outer (
                key varchar(60),
                user_id INT,
                domain VARCHAR(32) NOT NULL,
                PRIMARY KEY (key, user_id),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
            
            CREATE TABLE IF NOT EXISTS access_permissions (
                key_id INT,
                recipe_id INT,
                role INT NOT NULL DEFAULT 0,
                PRIMARY KEY (key_id, recipe_id),
                FOREIGN KEY (key_id) REFERENCES api_keys_inner(id) ON DELETE CASCADE,
                FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
            );

            DROP TABLE IF EXISTS recipe_images;

            CREATE TABLE IF NOT EXISTS recipe_images (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                recipe_id INT NOT NULL,
                slot INT NOT NULL,
                type VARCHAR(8) NOT NULL,
                file_name VARCHAR(32) GENERATED ALWAYS AS ('recipe-' || recipe_id::text || '_' || slot::text || '.' || type) STORED,
                caption TEXT,
                UNIQUE (recipe_id, slot) DEFERRABLE INITIALLY DEFERRED,
                FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
            );`,
            (err) => {
                if (err) return rej(err);

                console.log(`Created tables`);
                acc();
            },
        );
    });
}



export async function createTestUser() {
    const hashedPassword = await bcrypt.hash(`1234`, 10);

    return new Promise((acc, rej) => {
        db.query(`
            INSERT INTO users (name, password_hash, role)
            VALUES
                ($1, $2, $3),
                ($4, $5, $6)
            ON CONFLICT (name) DO NOTHING;
            `, [`test`, hashedPassword, 10, `test2`, hashedPassword, 0],
            (err) => {
                if (err) return rej(err);

                console.log(`Created tables`);
                acc();
            },
        );
    });
}



export function requireAuth(minRole) {
    return function (req, res, next) {
        if (!req.session.userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const userRole = req.session.role ?? 0;

        if (userRole < minRole) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        next();
    };
}