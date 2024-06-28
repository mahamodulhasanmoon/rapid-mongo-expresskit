import jwt from 'jsonwebtoken';
import { TJwtPayload } from '../modules/auth/auth.interface';
export const genarateToken = (
  jwtPayload: TJwtPayload,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
