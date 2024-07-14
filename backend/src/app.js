import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

import userRouter from './routes/user.routes.js';
app.use('/api/users', userRouter);

export  {app} ;