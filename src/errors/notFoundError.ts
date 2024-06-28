import { RequestHandler } from 'express';
import { CustomError } from './CustomError';
import { baseUrl } from '../config';

export const notFoundHandler: RequestHandler = (req, _res, next) => {
  const error = new CustomError(
    404,
    `Resource not found in ${baseUrl + req.url}`,
  );
  next(error);
};
