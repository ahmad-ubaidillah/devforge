import Stripe from 'stripe';

export class StripeService {
  private stripe: Stripe;

  constructor(apiKey: string) {
    this.stripe = new Stripe(apiKey, {
      apiVersion: '2023-10-16' as any,
    });
  }

  async createCheckoutSession(customerId: string, priceId: string) {
    try {
      return await this.stripe.checkout.sessions.create({
        customer: customerId,
        line_items: [{ price: priceId, quantity: 1 }],
        mode: 'subscription',
        success_url: '{{SUCCESS_URL}}',
        cancel_url: '{{CANCEL_URL}}',
      });
    } catch (error: any) {
      console.error(`[StripeService] Checkout session failed: ${error.message}`);
      throw error;
    }
  }

  async createBillingPortal(customerId: string) {
    try {
      return await this.stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: '{{RETURN_URL}}',
      });
    } catch (error: any) {
      console.error(`[StripeService] Billing portal creation failed: ${error.message}`);
      throw error;
    }
  }

  async handleWebhook(body: string, signature: string, secret: string) {
    try {
      return this.stripe.webhooks.constructEvent(body, signature, secret);
    } catch (error: any) {
      console.error(`[StripeService] Webhook construction failed: ${error.message}`);
      throw error;
    }
  }
}
