import { Response } from 'express';

interface IResponse<T> {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
  token?: string;
}

export const sendResponse = <T>(
  res: Response,
  { data, message, status, success, token }: IResponse<T>,
) => {
  return res.status(status).json({
    status,
    success,
    message,
    data,
    token,
  });
};
