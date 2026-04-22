import bcrypt from 'bcrypt';

import * as db from '../db/index.js';

const login = async (req, res) => {
    const { username, password } = req.body;

    const result = await db.query(`SELECT id, name, password_hash FROM users WHERE (name = $1)`, [username]);

    if (!result.rows[0]) {
        return res.status(400).json({ error: 'User not found' });
    }

    const valid = await bcrypt.compare(password, result.rows[0].password_hash);
    if (!valid) {
        return res.status(400).json({ error: 'Wrong password' });
    }

    req.session.userId = result.rows[0].id;
    req.session.userName = result.rows[0].name;
    req.session.role = 0; //SPÄTER ÄNDERN (wenn es Rollen gibt)

    res.json({ message: 'Logged in successfully' });
}

const logout = async (req, res) => {
    req.session.destroy(() => {
        res.json({ message: 'Logged out successfully' });
    });
}

export default {login, logout}