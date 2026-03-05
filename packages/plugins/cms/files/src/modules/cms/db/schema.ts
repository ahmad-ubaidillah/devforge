import { pgTable, text, timestamp, uuid, index, primaryKey, jsonb } from "drizzle-orm/pg-core";

/**
 * Categories Table
 * Allows organizing posts into primary buckets.
 */
export const categories = pgTable("category", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  organizationId: text("organization_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("category_org_idx").on(table.organizationId),
  index("category_slug_idx").on(table.slug),
]);

/**
 * Tags Table
 * Flexible labeling system for posts.
 */
export const tags = pgTable("tag", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  organizationId: text("organization_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("tag_org_idx").on(table.organizationId),
  index("tag_slug_idx").on(table.slug),
]);

/**
 * Posts Table
 * Updated with category, featured image, and SEO metadata.
 */
export const posts = pgTable("post", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  content: jsonb("content"), // Support for rich text JSON
  seo: jsonb("seo"), // Metadata: title, description, ogImage
  status: text("status", { enum: ["draft", "published"] }).default("draft").notNull(),
  authorId: text("author_id").notNull(),
  organizationId: text("organization_id").notNull(),
  categoryId: uuid("category_id").references(() => categories.id),
  featuredImageId: text("featured_image_id"), // Refers to external storage plugin
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
}, (table) => [
  index("post_org_idx").on(table.organizationId),
  index("post_slug_idx").on(table.slug),
]);

/**
 * Post-Tags Junction Table
 * Many-to-Many relationship between Posts and Tags.
 */
export const postTags = pgTable("post_tag", {
  postId: uuid("post_id").notNull().references(() => posts.id, { onDelete: 'cascade' }),
  tagId: uuid("tag_id").notNull().references(() => tags.id, { onDelete: 'cascade' }),
}, (table) => [
  primaryKey({ columns: [table.postId, table.tagId] })
]);

/**
 * Pages Table
 * Updated with SEO metadata.
 */
export const pages = pgTable("page", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  content: jsonb("content"),
  seo: jsonb("seo"),
  organizationId: text("organization_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
}, (table) => [
  index("page_org_idx").on(table.organizationId),
  index("page_slug_idx").on(table.slug),
]);
