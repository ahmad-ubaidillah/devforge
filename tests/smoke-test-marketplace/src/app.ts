import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { productsRoutes } from './modules/products/products.routes';
import { ordersRoutes } from './modules/orders/orders.routes';
import { vendorsRoutes } from './modules/vendors/vendors.routes';

const app = new Hono();

app.use('*', logger());

app.get('/', (c) => {
  return c.json({
    message: 'Welcome to smoke-test-marketplace MARKETPLACE - Powered by DevForge',
    status: 'running'
  });
});

app.route('/products', productsRoutes);
app.route('/orders', ordersRoutes);
app.route('/vendors', vendorsRoutes);

export default {
  port: 3000,
  fetch: app.fetch,
};