import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

const baseSchema = z.object({
  createdAt: z.coerce.date(),
  tags: z.array(z.string()).optional(),
  title: z.string(),
  updatedAt: z.coerce.date().optional(),
});

const blogSpecificSchema = z.object({
  alert: z.array(z.string()).optional(),
  description: z.string(),
  relatedPosts: reference("posts").array().optional(),
  status: z.enum(["draft", "published", "private", "preview"]).default("draft"),
  thumbnail: z.string().url(),
});

const blogSchema = baseSchema.merge(blogSpecificSchema);

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/*.mdx?" }),
  schema: blogSchema,
});

export const collections = { posts: posts };
