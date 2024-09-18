/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
  name: string;
  username: string;
  email: string;
  password?: string | null;
  role: 'user' | 'admin' | 'subadmin';
  isDeleted: boolean;
  code: number;
  googleId:string,
  avatar?:string;
  
}
export interface IUserMethod {
  comparePassword(password: string): Promise<boolean>;
}

export interface IUserModel
  extends Model<IUser, Record<string, never>, IUserMethod> {
  isUserExists(payload: Partial<IUser>): Promise<IUser | null>;
  updatePassword(id: string, password: Partial<IUser>): Promise<IUser | null>;
}

export type IUserRole = keyof typeof USER_ROLE;
