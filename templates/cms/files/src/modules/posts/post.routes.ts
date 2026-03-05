import { Hono } from 'hono';

export const postRoutes = new Hono();

// List all posts
postRoutes.get('/', (c) => {
  return c.json({ posts: [] });
});

// Create a new post
postRoutes.post('/', async (c) => {
  const body = await c.req.json();
  return c.json({ message: 'Post created', data: body });
});

// Get a single post by ID
postRoutes.get('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ id, title: 'Sample Post', content: '<p>Sample Content</p>' });
});

// Update a post
postRoutes.put('/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  return c.json({ message: 'Post updated', id, data: body });
});

// Delete a post
postRoutes.delete('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Post deleted', id });
});
