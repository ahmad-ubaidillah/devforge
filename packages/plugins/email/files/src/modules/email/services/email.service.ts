import { Resend } from 'resend';

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export class EmailService {
  private resend: Resend;

  constructor(apiKey: string) {
    this.resend = new Resend(apiKey);
  }

  async sendEmail(options: EmailOptions) {
    try {
      return await this.resend.emails.send({
        from: options.from || 'noreply@{{DOMAIN}}',
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
    } catch (error: any) {
      console.error(`[EmailService] Failed to send email: ${error.message}`);
      throw error;
    }
  }
}
