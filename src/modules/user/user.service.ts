import httpStatus from 'http-status';
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
  const update: Partial<IUser> = {};
  if (data.name !== undefined) update.name = data.name;
  if (data.username !== undefined) update.username = data.username;
  if (data.email !== undefined) update.email = data.email;
  if (data.avatar !== undefined) {
    update.avatar = data.avatar === '' ? undefined : data.avatar;
  }

  if (Object.keys(update).length === 0) {
    throw new CustomError(httpStatus.BAD_REQUEST, 'No valid fields to update');
  }

  if (update.email) {
    const taken = await User.findOne({
      email: update.email,
      _id: { $ne: id },
    });
    if (taken) {
      throw new CustomError(httpStatus.CONFLICT, 'Email is already in use');
    }
  }
  if (update.username) {
    const taken = await User.findOne({
      username: update.username,
      _id: { $ne: id },
    });
    if (taken) {
      throw new CustomError(httpStatus.CONFLICT, 'Username is already in use');
    }
  }

  const result = await User.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  });
  return result;
};
