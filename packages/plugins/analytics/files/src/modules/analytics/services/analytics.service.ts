import { PostHog } from 'posthog-node';

/**
 * AnalyticsService
 * 
 * Provides a unified way to track user events across the application.
 * Defaults to PostHog but follows a pattern that can be extended.
 */
export class AnalyticsService {
  private client: PostHog | null = null;

  constructor(apiKey?: string, host?: string) {
    if (apiKey) {
      this.client = new PostHog(apiKey, {
        host: host || 'https://app.posthog.com',
      });
    }
  }

  /**
   * Capture a custom event.
   */
  async capture(distinctId: string, event: string, properties?: Record<string, any>) {
    if (!this.client) {
      console.log(`[Analytics Mock] Event: ${event} for ${distinctId}`, properties);
      return;
    }

    this.client.capture({
      distinctId,
      event,
      properties,
    });
  }

  /**
   * Identify a user with custom traits.
   */
  async identify(distinctId: string, properties: Record<string, any>) {
    if (!this.client) {
      console.log(`[Analytics Mock] Identify: ${distinctId}`, properties);
      return;
    }

    this.client.identify({
      distinctId,
      properties,
    });
  }

  /**
   * Flush pending events (useful for serverless environments).
   */
  async flush() {
    if (this.client) {
      await this.client.flush();
    }
  }
}
