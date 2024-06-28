import { CustomError } from '../../errors/CustomError';
import { IUser } from './user.interface';
import { User } from './user.model';

export const getUserService = async (id: string) => {
  if (!id) {
    throw new CustomError(404, 'user Not Found');
  }

  const result = await User.findById(id);
  return result;
};

export const updateUserService = async (id: string, data: Partial<IUser>) => {
  const result = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return result;
};
