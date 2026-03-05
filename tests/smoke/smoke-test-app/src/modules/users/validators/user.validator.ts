import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(2),
  createdAt: z.date(),
});

export type User = z.infer<typeof userSchema>;

export const createUserSchema = userSchema.pick({
  email: true,
  name: true,
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
