import { Hono } from 'hono';

export const ordersRoutes = new Hono();

ordersRoutes.get('/', (c) => {
  return c.json({ data: [], module: 'orders' });
});

ordersRoutes.post('/', async (c) => {
  const body = await c.req.json();
  return c.json({ message: 'orders created', data: body });
});