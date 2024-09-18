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
  googleLoginCallbackController,
  loginController,
  logoutController,
  refreshController,
  resetPasswordController,
} from './auth.controller';
import auth from '../../middlewares/auth';
import passport from 'passport';

export const authRoutes: Router = Router();


authRoutes.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRoutes.get('/google/callback', passport.authenticate('google',  { session: false }),googleLoginCallbackController);



// main authentication
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
authRoutes.patch(
  '/change-password',
  auth('user', 'admin', 'subadmin'),
  changePasswordController,
);

authRoutes.get('/logout', logoutController);
