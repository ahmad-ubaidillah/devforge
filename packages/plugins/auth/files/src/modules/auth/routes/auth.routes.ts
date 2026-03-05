import { Hono } from 'hono';

export const authRoutes = new Hono();

authRoutes.post('/signup', (c) => {
  return c.json({ message: 'User signed up successfully' });
});

authRoutes.post('/login', (c) => {
  return c.json({ message: 'User logged in successfully' });
});

authRoutes.get('/me', (c) => {
  return c.json({ user: { id: '1', email: 'user@example.com' } });
});

/**
 * Organization Management
 */
authRoutes.post('/organizations', (c) => {
  return c.json({ message: 'Organization created successfully', id: 'org_123' });
});

authRoutes.get('/organizations', (c) => {
  return c.json({ 
    organizations: [
      { id: 'org_123', name: 'DevForge Team', slug: 'devforge' }
    ] 
  });
});
