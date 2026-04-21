import { Pool } from "pg";
import waitPort from 'wait-port';

let pool;

async function init() {
    await waitPort({
        host: process.env.DATABASE_HOST,
        port: 5432,
        timeout: 10000,
        waitForDns: true,
    });
    
    pool = new Pool({
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_DB,
    });

    return new Promise((acc, rej) => {
        pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name VARCHAR(32) UNIQUE NOT NULL,
                password_hash CHAR(32) NOT NULL,
                setting_theme_slug VARCHAR(32),
                setting_advanced_options bool
            );

            CREATE TABLE IF NOT EXISTS categories (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name VARCHAR(32) UNIQUE NOT NULL
            );

            CREATE TABLE IF NOT EXISTS recipes (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name VARCHAR(64) NOT NULL,
                category_id INT,
                FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
            );

            CREATE TABLE IF NOT EXISTS steps (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                recipe_id INT NOT NULL,
                index_number INT NOT NULL,
                text TEXT NOT NULL,
                FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
                UNIQUE (recipe_id, index_number)
            );

            CREATE TABLE IF NOT EXISTS ingredients (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                recipe_id INT NOT NULL,
                step_id INT,
                amount NUMERIC,
                unit VARCHAR(16),
                text VARCHAR(64) NOT NULL,
                comment TEXT,
                FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
                FOREIGN KEY (step_id) REFERENCES steps(id) ON DELETE SET NULL
            );
            
            CREATE TABLE IF NOT EXISTS api_keys_inner (
                key INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                user_id INT UNIQUE,
                name VARCHAR(32) UNIQUE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
            
            CREATE TABLE IF NOT EXISTS api_keys_outer (
                key INT,
                user_id INT,
                domain VARCHAR(32) NOT NULL,
                PRIMARY KEY (key, user_id),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
            
            CREATE TABLE IF NOT EXISTS access_permissions (
                key INT,
                recipe_id INT,
                role INT NOT NULL,
                PRIMARY KEY (key, recipe_id),
                FOREIGN KEY (key) REFERENCES api_keys_inner(key) ON DELETE CASCADE,
                FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
            );
            
            CREATE TABLE IF NOT EXISTS images (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                location VARCHAR(64) UNIQUE NOT NULL,
                user_id INT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS recipe_images (
                image_id INT NOT NULL,
                recipe_id INT,
                slot INT,
                caption TEXT,
                PRIMARY KEY (recipe_id, slot),
                FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE CASCADE,
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

export default { init };