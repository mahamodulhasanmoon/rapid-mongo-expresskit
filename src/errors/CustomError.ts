/* eslint-disable no-unused-vars */
export class CustomError extends Error {
  constructor(
    public status: number = 500,
    public message: string,
    public stack = '',
  ) {
    super(message);
    if (!stack) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
