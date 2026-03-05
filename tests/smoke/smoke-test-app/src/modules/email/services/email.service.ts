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
    return await this.resend.emails.send({
      from: options.from || 'noreply@localhost:3000',
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  }
}
