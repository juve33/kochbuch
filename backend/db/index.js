import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DB,
});

export const query = (text, params) => {
    try {
        return pool.query(text, params);
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