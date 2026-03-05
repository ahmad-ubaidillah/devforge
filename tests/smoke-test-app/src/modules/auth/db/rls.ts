import { sql } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

/**
 * setTenantSession
 * 
 * Sets the current organization ID in the Postgres session.
 * Used for Row Level Security (RLS).
 */
export async function setTenantSession(db: NodePgDatabase<any>, organizationId: string) {
  await db.execute(sql`SET LOCAL app.current_organization_id = ${organizationId}`);
}

/**
 * clearTenantSession
 * 
 * Clears the organization ID from the session.
 */
export async function clearTenantSession(db: NodePgDatabase<any>) {
  await db.execute(sql`SET LOCAL app.current_organization_id = ''`);
}

/**
 * rlsPolicy
 * 
 * Returns the SQL expression for the RLS policy.
 * Usage in Postgres: 
 * CREATE POLICY tenant_isolation ON table_name 
 * USING (organization_id = current_setting('app.current_organization_id', true));
 */
export const rlsPolicySql = sql`organization_id = current_setting('app.current_organization_id', true)`;
