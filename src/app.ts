import cors from 'cors';
import express from 'express';
const app = express();

import usersRoutes from './routes/users.routes';

app.use(express.json());
app.use(
  cors({
    origin: true,
    methods: ['POST, GET, PUT, PATCH, DELETE'],
  }),
);

app.use('/users', usersRoutes);

export default app;
