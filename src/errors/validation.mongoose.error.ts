import mongoose from 'mongoose';
import { TErrors } from '../interfaces/error.interface';

export const mongooseValidationError = (
  error: mongoose.Error.ValidationError,
): TErrors => {
  const errors = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  return errors;
};
export const mongooseCastError = (error: mongoose.Error.CastError): TErrors => {
  const errors = [
    {
      path: error.path,
      message: error.message,
    },
  ];
  return errors;
};
