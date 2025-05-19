import express from 'express';
import { authCheck } from '../middlewares/auth.middleware';
import { validateData } from '../middlewares/error.middleware';
import { ThreadSchemas } from '../schemas/thread.schemas';
import {
  createDataThreadController,
  deleteDataThreadController,
  getDataThreadController,
  updateDataThreadController,
} from '../controllers/threads.controller';
const router = express.Router();

router.get('/', authCheck, getDataThreadController);
router.post(
  '/',
  authCheck,
  validateData(ThreadSchemas),
  createDataThreadController,
);
router.put(
  '/:id',
  authCheck,
  validateData(ThreadSchemas),
  updateDataThreadController,
);
router.delete('/:id', authCheck, deleteDataThreadController);

export default router;
