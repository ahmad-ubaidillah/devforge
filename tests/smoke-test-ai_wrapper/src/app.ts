import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { promptsRoutes } from './modules/prompts/prompts.routes';
import { usageRoutes } from './modules/usage/usage.routes';

const app = new Hono();

app.use('*', logger());

app.get('/', (c) => {
  return c.json({
    message: 'Welcome to smoke-test-ai_wrapper AI_WRAPPER - Powered by DevForge',
    status: 'running'
  });
});

app.route('/prompts', promptsRoutes);
app.route('/usage', usageRoutes);

export default {
  port: 3000,
  fetch: app.fetch,
};