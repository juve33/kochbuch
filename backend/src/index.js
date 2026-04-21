import express from 'express';
import db from './utils.js';

const app = express();

db.init();