import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { postRoutes } from './modules/posts/post.routes';
import { mediaRoutes } from './modules/media/media.routes';

const app = new Hono();

app.use('*', logger());

app.get('/', (c) => {
  return c.json({
    message: 'Welcome to {{PROJECT_NAME}} CMS - Powered by DevForge',
    status: 'running'
  });
});

app.route('/posts', postRoutes);
app.route('/media', mediaRoutes);

export default {
  port: 3000,
  fetch: app.fetch,
};
