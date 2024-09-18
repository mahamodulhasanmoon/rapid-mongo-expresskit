import { z } from 'zod';

// Define the Zod schema for IUser
export const createUserValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string',
    }),
    username: z.string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string',
    }),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email('Invalid email address'),
      googleId: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .optional(),
    
    password: z.string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    }),
    role: z
      .enum(['user', 'admin'], {
        required_error: 'Role is required',
        invalid_type_error: 'Role must be either user or admin',
      })
      .default('user'),
  }),
});

// For Activation

export const activateUserValidation = z.object({
  body: z.object({
    activationToken: z.string({
      required_error: 'Token is required',
      invalid_type_error: 'Token must be a string',
    }),
    code: z.string({
      required_error: 'code is required',
      invalid_type_error: 'code must be a string',
    }),
  }),
});

export const loginValidation = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email('Invalid email address'),
    password: z.string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    }),
  }),
});
