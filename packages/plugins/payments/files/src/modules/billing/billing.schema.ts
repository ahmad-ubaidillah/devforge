import { z } from 'zod';

export const checkoutSchema = z.object({
  priceId: z.string().startsWith('price_'),
  success_url: z.string().url().optional(),
  cancel_url: z.string().url().optional(),
});

export const webhookSchema = z.object({
  signature: z.string().min(1),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type WebhookInput = z.infer<typeof webhookSchema>;
