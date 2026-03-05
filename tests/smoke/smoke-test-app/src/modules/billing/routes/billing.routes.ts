import { Hono } from 'hono';
import { StripeService } from '../services/stripe.service';

export const billingRoutes = new Hono<{
  Variables: {
    organizationId: string;
  }
}>();

// Ensure STIPE_SECRET_KEY is defined in .env
const stripeService = new StripeService(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

billingRoutes.post('/webhook', async (c) => {
  const body = await c.req.text();
  const signature = c.req.header('stripe-signature');

  if (!signature) {
    return c.json({ error: 'Missing signature' }, 400);
  }

  // Webhook handling logic here using StripeService
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';
  try {
    const event = await stripeService.handleWebhook(body, signature, whSecret);
    return c.json({ received: true });
  } catch (err: any) {
    return c.json({ error: `Webhook Error: ${err.message}` }, 400);
  }
});

billingRoutes.post('/checkout', async (c) => {
  const { priceId } = await c.req.json();
  const organizationId = c.get('organizationId');
  if (!organizationId) {
    return c.json({ error: 'Unauthorized: organizationId is required' }, 401);
  }
  
  // Call StripeService to create checkout session linked to the organization
  const session = await stripeService.createCheckoutSession(organizationId, priceId);
  return c.json({ url: session.url });
});

billingRoutes.get('/portal', async (c) => {
  const organizationId = c.get('organizationId');
  if (!organizationId) {
    return c.json({ error: 'Unauthorized: organizationId is required' }, 401);
  }
  
  // Call StripeService to create billing portal linked to the organization
  const url = await stripeService.createBillingPortal(organizationId);
  return c.json({ url });
});
