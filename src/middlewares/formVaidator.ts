import { RequestHandler } from 'express';

export const formValidator: RequestHandler = (req, _res, next) => {
  req.body = JSON.parse(req.body.data);

  next();
};