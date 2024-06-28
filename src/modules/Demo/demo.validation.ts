import { z } from 'zod';

export const DemoValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    name: z.string(),
    avatar: z.string(),
  }),
});
