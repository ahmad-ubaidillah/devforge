import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  slug: z.string().min(1),
  categoryId: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published']).default('draft'),
});

export const categorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
});

export const tagSchema = z.object({
  name: z.string().min(1),
});

export type PostInput = z.infer<typeof postSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type TagInput = z.infer<typeof tagSchema>;
