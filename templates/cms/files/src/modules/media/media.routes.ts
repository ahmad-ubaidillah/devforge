import { Hono } from 'hono';

export const mediaRoutes = new Hono();

// List all media
mediaRoutes.get('/', (c) => {
  return c.json({ media: [] });
});

// Upload media
mediaRoutes.post('/upload', async (c) => {
  const body = await c.req.parseBody();
  const file = body['file'];
  
  if (!file) {
    return c.json({ error: 'File is required' }, 400);
  }
  
  return c.json({ message: 'Media uploaded', filename: file });
});

// Delete media
mediaRoutes.delete('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Media deleted', id });
});
