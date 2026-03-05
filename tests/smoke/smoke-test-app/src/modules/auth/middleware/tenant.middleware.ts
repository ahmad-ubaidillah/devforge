import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';
import { AuthService } from '../services/auth.service';

/**
 * tenantMiddleware
 * 
 * Extracts the organization slug from the URL path (/ :tenant /...)
 * and validates its existence. It also checks if the user has access 
 * to this organization if a session exists.
 */
export const tenantMiddleware = (authService: AuthService) => createMiddleware(async (c, next) => {
  const tenantSlug = c.req.param('tenant');
  
  if (!tenantSlug) {
    return await next();
  }

  // Look up organization by slug
  // In a real implementation, we'd use a repository or the better-auth api
  const org = await authService.auth.api.getOrganizationBySlug({
    query: { slug: tenantSlug }
  });

  if (!org) {
    throw new HTTPException(404, { message: 'Organization not found' });
  }

  // Set organization in context
  c.set('organization', org);
  c.set('organizationId', org.id);

  // Check user membership if authenticated
  const session = await authService.getSession(c.req.raw);
  if (session) {
    const member = await authService.auth.api.getMember({
      query: {
        organizationId: org.id,
        userId: session.user.id
      }
    });

    if (!member) {
      throw new HTTPException(403, { message: 'You are not a member of this organization' });
    }
    c.set('member', member);
  }

  await next();
});
