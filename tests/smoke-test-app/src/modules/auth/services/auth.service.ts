import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";
// In a scaffolded project, this usually resolves to @devforge/core or relative path
// For the purpose of the SDK, we'll assume a relative path for now
import { eventBus } from "../../../../../../../core/src/hooks/event-bus";

/**
 * AuthService
 * 
 * This service provides a robust wrapper around Better Auth.
 * It is designed to work with Drizzle ORM.
 */
export class AuthService {
  public auth: any;

  constructor(db: any, provider: "pg" | "sqlite" | "mysql" = "pg", schema?: any) {
    this.auth = betterAuth({
      database: drizzleAdapter(db, {
        provider,
        schema,
      }),
      secret: process.env.BETTER_AUTH_SECRET || "development_secret_only_for_scaffolding",
      baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
      emailAndPassword: {
        enabled: true
      },
      plugins: [
        organization({
          allowUserToCreateOrganization: true,
          creatorRole: "owner",
        })
      ]
    });
  }

  /**
   * Authenticate a user with email and password.
   * Returns user data and headers to be sent to the client.
   */
  async login(credentials: { email: string; password: string }) {
    try {
      const response = await this.auth.api.signInEmail({
        body: {
          email: credentials.email,
          password: credentials.password,
        }
      });
      // Better Auth returns a response object that can include headers for setting cookies
      return { 
        success: true, 
        user: response.user, 
        session: response.session,
        headers: response.headers 
      };
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  }

  /**
   * Create a new user account.
   */
  async signup(data: any) {
    try {
      const response = await this.auth.api.signUpEmail({
        body: {
          email: data.email,
          password: data.password,
          name: data.name,
        }
      });
      return { 
        success: true, 
        user: response.user, 
        session: response.session,
        headers: response.headers
      };
    } catch (error: any) {
      throw new Error(error.message || 'Signup failed');
    }
  }

  /**
   * Create an organization.
   */
  async createOrganization(data: any, user: any) {
    try {
      const org = await this.auth.api.createOrganization({
        body: data,
        headers: new Headers({ "authorization": `Bearer ${user.id}` }) // Mocking auth for example
      });
      
      eventBus.dispatch('org.created', { org, creatorId: user.id });
      
      return org;
    } catch (error: any) {
      throw new Error(error.message || 'Organization creation failed');
    }
  }

  /**
   * Retrieve the current session from the request headers.
   */
  async getSession(request: Request | { headers: Headers }) {
    try {
      return await this.auth.api.getSession({ headers: request.headers });
    } catch (error) {
      return null;
    }
  }
}

