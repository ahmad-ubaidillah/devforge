import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';

export const openApiApp = new OpenAPIHono();

// Generates the OpenAPI JSON schema
openApiApp.doc('/openapi.json', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'DevForge Scaffolded API',
    description: 'Auto-generated documentation by the DevForge openapi plugin.',
  },
});

// Swagger UI Route
openApiApp.get('/docs', swaggerUI({ url: '/openapi.json' }));
