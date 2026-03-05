import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { calendarRoutes } from './modules/calendar/calendar.routes';
import { availabilityRoutes } from './modules/availability/availability.routes';

const app = new Hono();

app.use('*', logger());

app.get('/', (c) => {
  return c.json({
    message: 'Welcome to smoke-test-booking BOOKING - Powered by DevForge',
    status: 'running'
  });
});

app.route('/calendar', calendarRoutes);
app.route('/availability', availabilityRoutes);

export default {
  port: 3000,
  fetch: app.fetch,
};