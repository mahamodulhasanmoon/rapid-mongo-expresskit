import { access_token, access_token_expiry } from '../../config';
import { genarateToken } from '../../utils/genarateToken';
import { IUser } from './../user/user.interface';
import { IActivationCode, TJwtPayload } from './auth.interface';

export const activationCode = (payload: Partial<IUser>): IActivationCode => {
  const code = Math.floor(1000 + Math.random() * 9000);

  payload.code = code;

  const token = genarateToken(
    payload as TJwtPayload,
    access_token,
    access_token_expiry,
  );

  return {
    code,
    token,
  };
};
