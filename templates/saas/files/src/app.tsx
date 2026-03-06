import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { env } from './core/env';
import { errorHandler } from './core/errors';
import { userRoutes } from './modules/users/routes/user.routes';

// Core Modules
import { LandingPage } from './core/LandingPage';

const app = new Hono();

// Global Middleware
app.use('*', logger());
app.use('*', cors());

// UI - Landing Page
app.get('/', (c) => {
  return c.html(<LandingPage projectName="{{PROJECT_NAME}}" />);
});

// Feature Routes (Registry)
const api = new Hono();
api.route('/users', userRoutes);

// [PLUGIN_ROUTES_INJECTION_POINT]

app.route('/api', api);

// Error Handling
app.onError(errorHandler);

export default {
  port: parseInt(env.PORT),
  fetch: app.fetch,
};
