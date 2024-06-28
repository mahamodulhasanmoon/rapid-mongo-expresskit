import { z } from 'zod';

// Define the Zod schema for IUser
export const updateUserValidation = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .optional(),
    username: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .optional(),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email('Invalid email address'),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .optional(),
    phone: z
      .string({
        required_error: 'Phone number is required',
        invalid_type_error: 'Phone number must be a string',
      })
      .optional(),
    address: z
      .string({
        required_error: 'Address is required',
        invalid_type_error: 'Address must be a string',
      })
      .optional(),
    role: z
      .enum(['user', 'admin'], {
        required_error: 'Role is required',
        invalid_type_error: 'Role must be either user or admin',
      })
      .default('user')
      .optional(),
  }),
});
