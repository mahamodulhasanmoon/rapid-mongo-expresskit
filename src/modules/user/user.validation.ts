import { z } from 'zod';

/** Admin profile updates (no password or role here — use /auth/change-password). */
export const updateAdminProfileValidation = z.object({
  body: z
    .object({
      name: z.string().trim().min(1).optional(),
      username: z.string().trim().min(1).optional(),
      email: z.string().trim().email().optional(),
      avatar: z
        .union([
          z.string().url({ message: 'Avatar must be a valid URL' }),
          z.literal(''),
        ])
        .optional(),
    })
    .refine(
      (b) =>
        b.name !== undefined ||
        b.username !== undefined ||
        b.email !== undefined ||
        b.avatar !== undefined,
      { message: 'At least one field is required' },
    ),
});

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
