---
name: Stripe Financial Operations
description: Billing, webhooks, and multi-tenant payment loop integration.
---

# Stripe Best Practices

DevForge manages subscription loops and one-off payments securely using Stripe.

## 1. Webhooks over Polling

- Never rely solely on a successful API request from the client to fulfill an order (it's vulnerable).
- DevForge relies on Stripe Webhooks (`checkout.session.completed`, `invoice.paid`) routed to `stripe.webhook.ts`.

## 2. Idempotency Keys

- Always provide an `idempotencyKey` when creating charges or making state-mutating requests to Stripe to prevent double charging on retry logic.

## 3. The `subscription_loop_worker`

- Stripe webhooks only emit events. Ensure the payload is mapped, placed into a BullMQ queue, and processed safely using Drizzle transactions.
- Reconcile `organization_id` usage precisely when mapping Stripe Customer IDs to DevForge Accounts.

## 4. Zero Secrets

- Ensure `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` are strictly validated before starting the route listener. Never let them touch the client bundle.
