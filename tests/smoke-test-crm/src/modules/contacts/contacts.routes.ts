import { Hono } from 'hono';

export const contactsRoutes = new Hono();

contactsRoutes.get('/', (c) => {
  return c.json({ data: [], module: 'contacts' });
});

contactsRoutes.post('/', async (c) => {
  const body = await c.req.json();
  return c.json({ message: 'contacts created', data: body });
});