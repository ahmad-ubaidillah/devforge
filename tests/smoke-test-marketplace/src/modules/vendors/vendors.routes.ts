import { Hono } from 'hono';

export const vendorsRoutes = new Hono();

vendorsRoutes.get('/', (c) => {
  return c.json({ data: [], module: 'vendors' });
});

vendorsRoutes.post('/', async (c) => {
  const body = await c.req.json();
  return c.json({ message: 'vendors created', data: body });
});