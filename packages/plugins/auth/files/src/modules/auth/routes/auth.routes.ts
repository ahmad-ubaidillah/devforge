import { Hono } from 'hono';
import { signupSchema, loginSchema, organizationSchema } from '../auth.schema';

export const authRoutes = new Hono();

authRoutes.post('/signup', async (c) => {
  const body = await c.req.json();
  const result = signupSchema.safeParse(body);
  if (!result.success) return c.json({ error: result.error.format() }, 400);
  return c.json({ message: 'User signed up successfully' });
});

authRoutes.post('/login', async (c) => {
  const body = await c.req.json();
  const result = loginSchema.safeParse(body);
  if (!result.success) return c.json({ error: result.error.format() }, 400);
  return c.json({ message: 'User logged in successfully' });
});

authRoutes.get('/me', (c) => {
  return c.json({ user: { id: '1', email: 'user@example.com' } });
});

/**
 * Organization Management
 */
authRoutes.post('/organizations', async (c) => {
  const body = await c.req.json();
  const result = organizationSchema.safeParse(body);
  if (!result.success) return c.json({ error: result.error.format() }, 400);
  return c.json({ message: 'Organization created successfully', id: 'org_123' });
});

authRoutes.get('/organizations', (c) => {
  return c.json({ 
    organizations: [
      { id: 'org_123', name: 'DevForge Team', slug: 'devforge' }
    ] 
  });
});
