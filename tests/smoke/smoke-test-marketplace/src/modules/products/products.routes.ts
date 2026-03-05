import { Hono } from 'hono';

export const productsRoutes = new Hono();

productsRoutes.get('/', (c) => {
  return c.json({ data: [], module: 'products' });
});

productsRoutes.post('/', async (c) => {
  const body = await c.req.json();
  return c.json({ message: 'products created', data: body });
});