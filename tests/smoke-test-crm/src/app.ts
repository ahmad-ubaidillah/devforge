import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { contactsRoutes } from './modules/contacts/contacts.routes';
import { pipelinesRoutes } from './modules/pipelines/pipelines.routes';

const app = new Hono();

app.use('*', logger());

app.get('/', (c) => {
  return c.json({
    message: 'Welcome to smoke-test-crm CRM - Powered by DevForge',
    status: 'running'
  });
});

app.route('/contacts', contactsRoutes);
app.route('/pipelines', pipelinesRoutes);

export default {
  port: 3000,
  fetch: app.fetch,
};