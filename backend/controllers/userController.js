import bcrypt from 'bcrypt';

import * as db from '../db/index.js';

const innerApiKeysGet = async (req, res) => {
    const result = await db.query(`
        SELECT a.id AS key_id, a.name as foreign_user_name, u.name as local_user_name
        FROM api_keys_inner a
        LEFT JOIN users u ON u.id = a.user_id
        WHERE u.id <> $1
        ORDER BY LOWER(u.name) NULLS LAST, LOWER(a.name) ASC;
        `,
        [req.session.userId]
    );

    const innerApiKeys_parsed = {
        local: result.rows.filter((entry) => entry.local_user_name).map(key_set => ({
            "name": key_set.local_user_name,
            "key_id": key_set.key_id
        })) ?? [],
        foreign: result.rows.filter((entry) => !entry.local_user_name).map(key_set => ({
            "name": key_set.foreign_user_name,
            "key_id": key_set.key_id
        })) ?? []
    }

    res.status(200).json(innerApiKeys_parsed);
}

const newUserPost = async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(`INSERT INTO users (name, password_hash) VALUES ($1, $2)`, [username, hashedPassword])
        .catch(err => {
            if (err.code === '23502') {
                return res.status(400).json({ message: 'Username must not be empty' });
            }

            if (err.code === '23505') {
                return res.status(400).json({ message: 'Username already taken' });
            }
            
            return res.status(400).json({ message: 'Bad Request' });
        });

    res.status(201).json({ message: 'User created successfully' });
}

export default {innerApiKeysGet, newUserPost}