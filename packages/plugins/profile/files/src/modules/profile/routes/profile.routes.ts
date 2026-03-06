import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

export const profileRoutes = new Hono();

const updateProfileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  bio: z.string().optional(),
});

profileRoutes.get('/me', (c) => {
  // Mock data for the SaaS experience
  return c.json({
    id: '1',
    name: 'System Administrator',
    email: 'admin@devforge.dev',
    role: 'ADMIN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
  });
});

profileRoutes.patch('/update', zValidator('json', updateProfileSchema), async (c) => {
  const body = c.req.valid('json');
  return c.json({
    message: 'Profile updated successfully',
    user: { ...body, id: '1' }
  });
});

profileRoutes.get('/settings', (c) => {
  return c.json({
    notifications: {
      email: true,
      push: false,
    },
    theme: 'dark',
    language: 'en'
  });
});
