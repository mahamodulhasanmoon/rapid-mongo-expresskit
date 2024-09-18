import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { IUser } from '../user/user.interface';
import jwt from 'jsonwebtoken';
import passport from 'passport'; 
import {
  changePasswordService,
  createUserService,
  forgetPasswordService,
  loginService,
  prepareForActivateService,
  refreshTokenService,
  resetPasswordPasswordService,
} from './auth.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { NODE_ENV, access_token, access_token_expiry, refresh_token, refresh_token_expiry } from '../../config';
import { JwtPayload } from 'jsonwebtoken';
import { CustomError } from '../../errors/CustomError';
import { ILogin } from './auth.interface';
import { genarateToken } from '../../utils/genarateToken';


export const googleLoginController: RequestHandler = catchAsync(() => {
passport.authenticate('google',{
  scope: ['email','profile'],
})

});

export const  googleLoginCallbackController:RequestHandler = catchAsync((req,res) => {
 const user:any = req.user;
if(user){
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    name: user.username,
    role: user.role,
    avatar: user.avatar,
    username: user.username,
  };
 

  const accessToken = genarateToken(jwtPayload, access_token, access_token_expiry);
  const refreshToken = genarateToken(jwtPayload, refresh_token, refresh_token_expiry);
  

  res.cookie('refreshToken', refreshToken, {
    secure: NODE_ENV === 'production',
    httpOnly: true,
    sameSite:'lax' 
  });

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'logged in successfully',
    token: accessToken,
    data: user,
  });
}


});

// export const googleLoginCallbackController = (req: Request, res: any) => {
//   // if (!req.user) {
//   //   return res.status(500).json({
//   //     status: 500,
//   //     success: false,
//   //     message: 'User not found',
//   //   });
//   // }
//   // const { accessToken, refreshToken } = req?.user as any; 
//   // console.log(accessToken,refreshToken);

//   // res.cookie('refreshToken', refreshToken, {
//   //   secure: NODE_ENV === 'production',
//   //   httpOnly: true,
//   // });
//   // res.cookie('accessToken', accessToken, {
//   //   secure: NODE_ENV === 'production',
//   //   httpOnly: true,
//   // });



//   // Redirect to a secure page or dashboard after successful login
//   // res.redirect('/dashboard');
// };

export const createUserController: RequestHandler = catchAsync(
  async (req, res) => {
    const payload: IUser = req.body;

    const { token } = await prepareForActivateService(payload);
    sendResponse(res, {
      status: httpStatus.CREATED,
      success: true,
      message: 'Please Check Your Email To Activate your Account',
      token,
    });
  },
);

export const activateAccountController: RequestHandler = catchAsync(
  async (req, res) => {
    const { code, activationToken } = req.body;
    const newUser = jwt.verify(
      activationToken,
      access_token as string,
    ) as JwtPayload;

    if (!newUser) {
      throw new CustomError(404, 'User Not Found');
    }
    if (newUser.code.toString() !== code.toString()) {
      throw new CustomError(httpStatus.UNAUTHORIZED, 'Invalid Code');
    }
    const formated: IUser = Object.keys(newUser).reduce((obj: any, key) => {
      if (key !== 'iat' && key !== 'exp' && key !== 'code') {
        obj[key] = newUser[key];
      }
      return obj;
    }, {} as IUser);

    const { result, token }: any = await createUserService(formated);

    sendResponse(res, {
      status: httpStatus.CREATED,
      success: true,
      message: 'Account activated successfully',
      data: result,
      token: token,
    });
  },
);

// Account creation Part  End

/**
 *  === ============= === Login part  === ---- === ===
 */

export const loginController: RequestHandler = catchAsync(async (req, res) => {
  const payload: ILogin = req.body;
  const { refreshToken, accessToken, rest } = await loginService(payload);

  res.cookie('refreshToken', refreshToken, {
    secure: NODE_ENV === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'logged in successfully',
    token: accessToken,
    data: rest,
  });
});

export const refreshController: RequestHandler = catchAsync(
  async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await refreshTokenService(refreshToken);
    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Access token is retrieved succesfully!',
      token: result,
    });
  },
);

/**
 *  === ============= === Password Management  For Reset And Forget  === ---- === ===
 */

export const forgetPasswordController: RequestHandler = catchAsync(
  async (req, res) => {
    const token = await forgetPasswordService(req.body);

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Please Check Your Email To Reset Your Password',
      token,
    });
  },
);
export const resetPasswordController: RequestHandler = catchAsync(
  async (req, res) => {
    const token = req.query.token as string;
    await resetPasswordPasswordService(token, req.body);

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'password Reset Successfully',
      token,
    });
  },
);
export const changePasswordController: RequestHandler = catchAsync(
  async (req, res) => {
    const user:any = req.user;
    await changePasswordService(user, req.body);

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'password updated Successfully',
    });
  },
);

export const logoutController: RequestHandler = catchAsync(async (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Logout failed',
        error: err.message || 'An unexpected error occurred',
      });
    }

    // Clear local cookies (e.g., accessToken, refreshToken)
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'logout Successfully',
      // token: result,
      // data: req.session
    });
  });
});
