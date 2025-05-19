import cors from 'cors';
import express from 'express';
const app = express();

import usersRoutes from './routes/users.routes';
import threadsRoutes from './routes/threads.routes';
import { errorHandler } from './middlewares/error.handler';

app.use(express.json());
app.use(
  cors({
    origin: true,
    methods: ['POST, GET, PUT, PATCH, DELETE'],
  }),
);

app.use('/users', usersRoutes);
app.use('/threads', threadsRoutes);
app.use(errorHandler);

export default app;
