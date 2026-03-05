import { Hono } from 'hono';

export const pipelinesRoutes = new Hono();

pipelinesRoutes.get('/', (c) => {
  return c.json({ data: [], module: 'pipelines' });
});

pipelinesRoutes.post('/', async (c) => {
  const body = await c.req.json();
  return c.json({ message: 'pipelines created', data: body });
});