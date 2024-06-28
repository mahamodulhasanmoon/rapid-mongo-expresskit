import { Router } from 'express';
import { requestValidator } from '../../middlewares/requestValidator';
import {
  activateUserValidation,
  createUserValidation,
  loginValidation,
} from './auth.validaton';
import {
  activateAccountController,
  changePasswordController,
  createUserController,
  forgetPasswordController,
  loginController,
  logoutController,
  refreshController,
  resetPasswordController,
} from './auth.controller';
import auth from '../../middlewares/auth';

export const authRoutes: Router = Router();

authRoutes.post(
  '/signup',
  requestValidator(createUserValidation),
  createUserController,
);
authRoutes.post(
  '/activate',
  requestValidator(activateUserValidation),
  activateAccountController,
);
authRoutes.post('/login', requestValidator(loginValidation), loginController);
// authRoutes.get(
//   '/me',
//   auth('admin','subadmin','user'),
//   getMe,
// );
authRoutes.get('/refresh', refreshController);

authRoutes.post('/forgot-password', forgetPasswordController);
authRoutes.patch('/reset-password', resetPasswordController);
authRoutes.patch('/change-password',auth('user','admin','subadmin') ,changePasswordController);

authRoutes.get('/logout', logoutController);
