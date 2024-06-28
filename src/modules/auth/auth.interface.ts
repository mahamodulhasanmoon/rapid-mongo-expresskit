import { Types } from 'mongoose';

export interface IActivationCode {
  token: string;
  code: number;
}

export interface ILogin {
  email: string;
  password: string;
}

export type TJwtPayload = {
  userId: Types.ObjectId;
  email: string;
  name: string;
  username: string;
  role: string;
};
