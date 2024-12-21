import { cldAssetsLoader } from "astro-cloudinary/loaders";
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

// see: https://github.com/withastro/astro/issues/12784
// somehow new glob loader is broken
const posts = defineCollection({
  schema: blogSchema,
  type: "content",
});

const cldImages = defineCollection({
  loader: cldAssetsLoader({ limit: 2000 }),
});

export const collections = { cldImages: cldImages, posts: posts };
