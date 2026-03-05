import { Hono } from 'hono';

export const reportsRoutes = new Hono();

reportsRoutes.get('/', (c) => {
  return c.json({ data: [], module: 'reports' });
});

reportsRoutes.post('/', async (c) => {
  const body = await c.req.json();
  return c.json({ message: 'reports created', data: body });
});