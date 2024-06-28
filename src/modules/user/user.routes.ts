import { Router } from 'express';
import { getUserController } from './user.controller';
import auth from '../../middlewares/auth';

export const userRoutes: Router = Router();

userRoutes.get('/me', auth('admin', 'user', 'subadmin'), getUserController);
// userRoutes.put('/me', auth('admin', 'user'), updateUserController);
