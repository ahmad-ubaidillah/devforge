import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { env } from './core/env';
import { errorHandler } from './core/errors';
import { userRoutes } from './modules/users/routes/user.routes';

const app = new Hono();

// Global Middleware
app.use('*', logger());
app.use('*', cors());

// Health Check
app.get('/', (c) => {
  return c.json({
    message: 'Welcome to smoke-test-app - Powered by DevForge',
    status: 'running',
    version: '1.0.0'
  });
});

// Feature Routes
app.route('/api/users', userRoutes);

// Error Handling
app.onError(errorHandler);

export default {
  port: parseInt(env.PORT),
  fetch: app.fetch,
};
