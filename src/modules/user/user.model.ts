import { Schema, model } from 'mongoose';
import { IUser, IUserModel } from './user.interface';
import { saltRound } from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser, IUserModel>(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    username: {
      type: String,
      required: [true, 'username is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    googleId: {
      type: String,
      default: null,
    },
    avatar:{
      type:String
    },
    password: {
      type: String,
      select: 0,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: {
        values: ['user', 'admin'],
        message: 'Role must be either user or admin',
      },
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  if (user.password) {
    user.password = await bcrypt.hash(user.password, Number(saltRound));
  }
  next();
});

userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

userSchema.statics.isUserExists = async function (payload) {
  const existingUser = await User.findOne({
    $or: [{ email: payload.email }, { username: payload.username }],
  });
  return existingUser;
};
userSchema.statics.updatePassword = async function (
  email: string,
  payload: Partial<IUser>,
) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  (user as any).password = payload.password;
  await user.save();
};
userSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<IUser, IUserModel>('User', userSchema);
