import express from 'express';
import {
  deleteUsersControllers,
  getAllusers,
  loginUsers,
  registerUsers,
  updateUsers,
  userAuthCheck,
} from '../controllers/users.controller';
import { validateData } from '../middlewares/error.middleware';
import { UsersSchemaDTO } from '../schemas/users.schemas';
import { authCheck } from '../middlewares/auth.middleware';
const router = express.Router();

router.get('/', getAllusers);
router.post('/', validateData(UsersSchemaDTO), registerUsers);
router.post('/login', validateData(UsersSchemaDTO), loginUsers);
router.put('/:id', authCheck, validateData(UsersSchemaDTO), updateUsers);
router.get('/auth', authCheck, userAuthCheck);
router.delete('/', authCheck, deleteUsersControllers);

export default router;
