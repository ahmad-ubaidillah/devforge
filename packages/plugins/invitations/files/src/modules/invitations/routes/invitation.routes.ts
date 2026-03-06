import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { InvitationService } from '../services/invitations.service';

export const invitationRoutes = new Hono();
const service = new InvitationService();

const inviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(['ADMIN', 'MEMBER', 'VIEWER']),
  organizationId: z.string(),
});

invitationRoutes.post('/send', zValidator('json', inviteSchema), async (c) => {
  const { email, role, organizationId } = c.req.valid('json');
  
  const result = await service.sendInvitation(email, role, organizationId);
  
  return c.json({
    message: `Invitation processed for ${email}`,
    invitation: {
      email,
      role,
      token: result.token,
      status: 'PENDING',
      expiresAt: result.expiresAt
    }
  });
});

invitationRoutes.get('/list/:orgId', (c) => {
  return c.json({
    invitations: [
      { id: 'inv_1', email: 'pending@example.com', role: 'MEMBER', status: 'PENDING' }
    ]
  });
});

invitationRoutes.post('/accept/:token', (c) => {
  return c.json({
    message: 'Invitation accepted successfully',
    organizationId: 'org_123'
  });
});
