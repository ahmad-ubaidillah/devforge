import { Hono } from 'hono';

export const usageRoutes = new Hono();

usageRoutes.get('/', (c) => {
  return c.json({ data: [], module: 'usage' });
});

usageRoutes.post('/', async (c) => {
  const body = await c.req.json();
  return c.json({ message: 'usage created', data: body });
});