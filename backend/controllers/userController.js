import bcrypt from 'bcrypt';

import * as db from '../db/index.js';

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

export default {newUserPost}