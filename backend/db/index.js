import { Pool } from 'pg';

export const pool = new Pool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DB,
});

export const query = async (text, params) => {
    try {
        return await pool.query(text, params);
    } catch (err) {
        console.error('DB ERROR:', {
            text,
            params,
            code: err.code,
            message: err.message,
        });
        throw err;
    }
}