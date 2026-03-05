---
name: BullMQ Best Practices
description: Asynchronous task processing, queues, and Redis interactions via BullMQ.
---

# BullMQ Best Practices

DevForge uses `bullmq` and `ioredis` to manage background jobs, email sending, webhooks, and heavy analytics abstractions.

## 1. Queue Separation

- Define queues by business domain (e.g., `emails`, `webhooks`, `payments`).
- Do not mix wildly different payloads in the same queue. Create multiple consumers.

## 2. Job Payloads & Zod Validation

- The data passed into `queue.add('jobName', payload)` must be stringifiable JSON.
- The consumer Worker MUST validate the incoming payload using a Zod schema before executing business logic. Do not trust queue payloads blindly.

## 3. Idempotency & Retries

- Background jobs must be idempotent. If a job fails halfway, retrying it should not corrupt the database or double-charge a user.
- Configure safe `attempts` and `backoff` strategies for external API calls (e.g., Stripe, Postmark).

## 4. Service Layer Execution

- The BullMQ Worker should simply unwrap the payload, validate it, and immediately call a `.service.ts` function. Do not put massive business logic inside the worker definition itself.
