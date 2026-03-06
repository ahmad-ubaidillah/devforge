import { Resend } from 'resend';

export class InvitationService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');
  }

  async sendInvitation(email: string, role: string, organizationId: string) {
    const inviteToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48 hours
    
    // In production, insert this token into your database mapping to the orgId & role.
    
    const inviteLink = `https://${process.env.DOMAIN || 'localhost:3000'}/invites/accept?token=${inviteToken}`;
    
    try {
      const data = await this.resend.emails.send({
        from: 'DevForge <onboarding@resend.dev>',
        to: email,
        subject: `You've been invited to join an organization!`,
        html: `
          <h1>Organization Invitation</h1>
          <p>You have been invited to join an organization on DevForge with the role of <strong>${role}</strong>.</p>
          <a href="${inviteLink}" style="padding: 10px 20px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 5px;">Accept Invitation</a>
          <p><small>This link expires in 48 hours.</small></p>
        `,
      });
      return { success: true, token: inviteToken, expiresAt, resendId: data.id };
    } catch (error: any) {
      console.error('[InvitationService] Failed to send email:', error);
      // Fallback for development if RESEND_API_KEY is missing
      return { success: true, token: inviteToken, expiresAt, mock: true, error: error.message };
    }
  }
}
