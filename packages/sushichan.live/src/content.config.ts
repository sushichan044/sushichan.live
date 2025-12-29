import { cldAssetsLoader } from "astro-cloudinary/loaders";
import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

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
  thumbnail: z.url()
});

const blogSchema = baseSchema.extend(blogSpecificSchema.shape);

// see: https://github.com/withastro/astro/issues/12784
// somehow new glob loader is broken
const posts = defineCollection({
  schema: blogSchema,
  loader: glob({ base: "./src/content/posts", pattern: "**/*.{md,mdx}" }),
});

const cldImages = defineCollection({
  loader: cldAssetsLoader({ limit: 2000 }),
});

export const collections = { cldImages: cldImages, posts: posts };
