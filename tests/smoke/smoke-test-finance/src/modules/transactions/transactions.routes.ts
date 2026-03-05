import { Hono } from 'hono';

export const transactionsRoutes = new Hono();

transactionsRoutes.get('/', (c) => {
  return c.json({ data: [], module: 'transactions' });
});

transactionsRoutes.post('/', async (c) => {
  const body = await c.req.json();
  return c.json({ message: 'transactions created', data: body });
});