import { Hono } from 'hono';
import { CMSService } from '../services/cms.service';

export const cmsRoutes = new Hono<{
  Variables: {
    organizationId: string;
    db: any;
  }
}>();

// --- Posts ---
cmsRoutes.get('/posts', async (c) => {
  const cmsService = new CMSService(c.get('db'));
  const categorySlug = c.req.query('category');
  const posts = await cmsService.getPosts(c.get('organizationId'), { categorySlug });
  return c.json({ posts });
});

cmsRoutes.post('/posts', async (c) => {
  const cmsService = new CMSService(c.get('db'));
  const body = await c.req.json();
  const post = await cmsService.createPost(body, c.get('organizationId'));
  return c.json({ post });
});

// --- Categories ---
cmsRoutes.get('/categories', async (c) => {
  const cmsService = new CMSService(c.get('db'));
  const categories = await cmsService.getCategories(c.get('organizationId'));
  return c.json({ categories });
});

cmsRoutes.post('/categories', async (c) => {
  const cmsService = new CMSService(c.get('db'));
  const body = await c.req.json();
  const category = await cmsService.createCategory(body, c.get('organizationId'));
  return c.json({ category });
});

// --- Tags ---
cmsRoutes.get('/tags', async (c) => {
  const cmsService = new CMSService(c.get('db'));
  const tags = await cmsService.getTags(c.get('organizationId'));
  return c.json({ tags });
});

cmsRoutes.post('/tags', async (c) => {
  const cmsService = new CMSService(c.get('db'));
  const body = await c.req.json();
  const tag = await cmsService.createTag(body, c.get('organizationId'));
  return c.json({ tag });
});

// --- Pages ---
cmsRoutes.get('/pages/:slug', async (c) => {
  const cmsService = new CMSService(c.get('db'));
  const page = await cmsService.getPageBySlug(c.req.param('slug'), c.get('organizationId'));
  if (!page) return c.json({ message: 'Page not found' }, 404);
  return c.json({ page });
});
