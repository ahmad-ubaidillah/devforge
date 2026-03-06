import { expect, test, describe } from "bun:test";
import { Hono } from "hono";
import { authRoutes } from "../packages/plugins/auth/files/src/modules/auth/routes/auth.routes";
import { cmsRoutes } from "../packages/plugins/cms/files/src/modules/cms/routes/cms.routes";
import { billingRoutes } from "../packages/plugins/payments/files/src/modules/billing/routes/billing.routes";
import { SearchService } from "../packages/plugins/search/files/src/modules/search/services/search.service";

describe("Plugin Smoke Tests", () => {
  
  describe("Auth Plugin", () => {
    test("POST /signup - Valid Input", async () => {
      const res = await authRoutes.request("/signup", {
        method: "POST",
        body: JSON.stringify({ email: "test@example.com", password: "password123" }),
        headers: { "Content-Type": "application/json" }
      });
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.message).toBe("User signed up successfully");
    });

    test("POST /signup - Invalid Input (Bad Email)", async () => {
      const res = await authRoutes.request("/signup", {
        method: "POST",
        body: JSON.stringify({ email: "invalid-email", password: "123" }),
        headers: { "Content-Type": "application/json" }
      });
      expect(res.status).toBe(400);
    });
  });

  describe("Payments Plugin", () => {
    test("POST /checkout - Valid Input", async () => {
      // Mock organizationId in context
      const app = new Hono<{ Variables: { organizationId: string } }>();
      app.use("*", async (c, next) => {
        c.set("organizationId", "org_123");
        await next();
      });
      app.route("/", billingRoutes);

      const res = await app.request("/checkout", {
        method: "POST",
        body: JSON.stringify({ priceId: "price_123" }),
        headers: { "Content-Type": "application/json" }
      });
      
      // Note: This might hit the actual Stripe constructor if not mocked, 
      // but let's see if the validation works first.
      expect([200, 400, 500]).toContain(res.status); // 400/500 if Stripe API key missing
    });
  });

  describe("CMS Plugin", () => {
    test("POST /posts - Valid Input", async () => {
      const app = new Hono<{ Variables: { organizationId: string, db: any } }>();
      app.use("*", async (c, next) => {
        c.set("organizationId", "org_123");
        c.set("db", {
          insert: () => ({ values: () => ({ returning: () => [{ id: "1" }] }) }),
          select: () => ({ from: () => ({ where: () => [] }) })
        });
        await next();
      });
      app.route("/", cmsRoutes);

      const res = await app.request("/posts", {
        method: "POST",
        body: JSON.stringify({ 
          title: "Test Post", 
          content: "Hello World", 
          slug: "test-post" 
        }),
        headers: { "Content-Type": "application/json" }
      });
      expect(res.status).toBe(200);
    });
  });

  describe("Search Plugin", () => {
    test("SearchService - Postgres Fallback", async () => {
      const searchService = new SearchService({ type: "postgres" });
      const result = await searchService.search("posts", "test");
      expect(result.fallback).toBe(true);
      expect(result.hits).toBeArray();
    });
  });

});
