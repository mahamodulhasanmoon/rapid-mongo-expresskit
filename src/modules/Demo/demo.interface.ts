import {} from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export interface IDemo {
  name: UserName;
  email: string;
  avatar?: string;
}
