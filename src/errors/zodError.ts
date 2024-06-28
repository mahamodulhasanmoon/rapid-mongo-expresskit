import { ZodError, ZodIssue } from 'zod';

export const handleZodError = (err: ZodError) => {
  const errors = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return errors;
};
