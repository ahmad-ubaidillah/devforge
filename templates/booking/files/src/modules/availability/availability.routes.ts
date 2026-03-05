import { Hono } from 'hono';

export const availabilityRoutes = new Hono();

availabilityRoutes.get('/', (c) => {
  return c.json({ data: [], module: 'availability' });
});

availabilityRoutes.post('/', async (c) => {
  const body = await c.req.json();
  return c.json({ message: 'availability created', data: body });
});