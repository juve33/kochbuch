import express from 'express';
import cors from 'cors';
import corsConfig from './config/cors.js';
import session from 'express-session';
import waitPort from 'wait-port';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';

import bcrypt from 'bcrypt';
import * as db from './db/index.js';
import { init, createTestUser, requireAuth } from './src/utils.js';

const app = express();

app.use(cors(corsConfig));

app.use(express.json());

app.use(
  session({
    secret: 'super-secret-key', // SPÄTER ÄNDERN => beim Containerbau env file generieren lassen
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // SPÄTER AUF TRUE SETZEN
        sameSite: 'lax' // SPÄTER ÄNDERN
    }
  })
);

app.use('/api/auth', authRoutes);

app.use('/api/user', userRoutes);

app.use('/api/recipe', recipeRoutes);



await waitPort({
    host: process.env.DATABASE_HOST,
    port: 5432,
    timeout: 10000,
    waitForDns: true,
});

init();

createTestUser();



app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});