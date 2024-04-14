import { defineCollection, reference, z } from "astro:content"

const baseSchema = z.object({
  createdAt: z.coerce.date(),
  tags: z.array(z.string()).optional(),
  title: z.string(),
  updatedAt: z.coerce.date().optional(),
})

const posts = defineCollection({
  schema: baseSchema.merge(
    z.object({
      alert: z.array(z.string()).optional(),
      description: z.string(),
      relatedPosts: reference("posts").array().optional(),
      status: z
        .enum(["draft", "published", "private", "preview"])
        .default("draft"),
      thumbnail: z.string().url(),
      type: z.literal("blog"),
    }),
  ),
  type: "content",
})

const presentations = defineCollection({
  schema: baseSchema.merge(
    z.object({
      type: z.literal("presentation"),
      url: z.string().url(),
    }),
  ),
  type: "data",
})

export const collections = { posts: posts, presentations: presentations }
