import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { transactionsRoutes } from './modules/transactions/transactions.routes';
import { reportsRoutes } from './modules/reports/reports.routes';

const app = new Hono();

app.use('*', logger());

app.get('/', (c) => {
  return c.json({
    message: 'Welcome to {{PROJECT_NAME}} FINANCE - Powered by DevForge',
    status: 'running'
  });
});

app.route('/transactions', transactionsRoutes);
app.route('/reports', reportsRoutes);

export default {
  port: 3000,
  fetch: app.fetch,
};