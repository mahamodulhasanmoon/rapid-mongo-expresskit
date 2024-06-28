// order.validation.ts

import { z } from 'zod';
export const orderValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    name: z.string(),
    avatar: z.string(),
  }),
});

  