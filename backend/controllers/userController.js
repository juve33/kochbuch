import bcrypt from 'bcrypt';

import * as db from '../db/index.js';

const newUserPost = async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(`INSERT INTO users (name, password_hash) VALUES ($1, $2)`, [username, hashedPassword]);

    res.json({ message: 'User created successfully' });
}

export default {newUserPost}