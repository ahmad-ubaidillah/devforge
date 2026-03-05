import { Hono } from 'hono';

export const calendarRoutes = new Hono();

calendarRoutes.get('/', (c) => {
  return c.json({ data: [], module: 'calendar' });
});

calendarRoutes.post('/', async (c) => {
  const body = await c.req.json();
  return c.json({ message: 'calendar created', data: body });
});