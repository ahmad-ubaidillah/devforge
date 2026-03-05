import Stripe from 'stripe';

export class StripeService {
  private stripe: Stripe;

  constructor(apiKey: string) {
    this.stripe = new Stripe(apiKey, {
      apiVersion: '2023-10-16' as any,
    });
  }

  async createCheckoutSession(customerId: string, priceId: string) {
    return await this.stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: '{{SUCCESS_URL}}',
      cancel_url: '{{CANCEL_URL}}',
    });
  }

  async createBillingPortal(customerId: string) {
    return await this.stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: '{{RETURN_URL}}',
    });
  }

  async handleWebhook(body: string, signature: string, secret: string) {
    return this.stripe.webhooks.constructEvent(body, signature, secret);
  }
}
