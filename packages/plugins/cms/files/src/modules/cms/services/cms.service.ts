import { eq, and, inArray } from 'drizzle-orm';
import { posts, pages, categories, tags, postTags } from '../db/schema';
import { eventBus } from '../../../../../../../core/src/hooks/event-bus';

export class CMSService {
  private db: any;

  constructor(db: any) {
    this.db = db;
  }

  // --- Posts ---
  async getPosts(organizationId: string, options: { categorySlug?: string } = {}) {
    let query = this.db.select().from(posts).where(eq(posts.organizationId, organizationId));
    
    if (options.categorySlug) {
      const cat = await this.getCategoryBySlug(options.categorySlug, organizationId);
      if (cat) {
        query = this.db.select().from(posts).where(
          and(eq(posts.organizationId, organizationId), eq(posts.categoryId, cat.id))
        );
      }
    }
    
    return await query;
  }

  async createPost(data: any, organizationId: string) {
    const { tagIds, ...postData } = data;
    const [post] = await this.db.insert(posts).values({
      ...postData,
      organizationId,
    }).returning();

    if (tagIds && tagIds.length > 0) {
      await this.db.insert(postTags).values(
        tagIds.map((tagId: string) => ({ postId: post.id, tagId }))
      );
    }
    
    eventBus.dispatch('cms.post.created', { post, organizationId });

    return post;
  }

  // --- Categories ---
  async getCategories(organizationId: string) {
    return await this.db.select().from(categories).where(eq(categories.organizationId, organizationId));
  }

  async createCategory(data: any, organizationId: string) {
    return await this.db.insert(categories).values({
      ...data,
      organizationId,
    }).returning();
  }

  async getCategoryBySlug(slug: string, organizationId: string) {
    const [category] = await this.db.select()
      .from(categories)
      .where(and(eq(categories.slug, slug), eq(categories.organizationId, organizationId)));
    return category;
  }

  // --- Tags ---
  async getTags(organizationId: string) {
    return await this.db.select().from(tags).where(eq(tags.organizationId, organizationId));
  }

  async createTag(data: any, organizationId: string) {
    return await this.db.insert(tags).values({
      ...data,
      organizationId,
    }).returning();
  }

  // --- Pages ---
  async getPageBySlug(slug: string, organizationId: string) {
    const [page] = await this.db.select()
      .from(pages)
      .where(and(eq(pages.slug, slug), eq(pages.organizationId, organizationId)));
    return page;
  }
}
