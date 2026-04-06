import { Router } from 'express';
import { getUserController, updateUserController } from './user.controller';
import auth from '../../middlewares/auth';
import { requestValidator } from '../../middlewares/requestValidator';
import { updateAdminProfileValidation } from './user.validation';

export const userRoutes: Router = Router();

userRoutes.get('/me', auth('admin', 'user', 'subadmin'), getUserController);
userRoutes.patch(
  '/me',
  auth('admin'),
  requestValidator(updateAdminProfileValidation),
  updateUserController,
);
