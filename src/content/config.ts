import { defineCollection, reference, z } from "astro:content"

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    thumbnail: z.string().url(),
    tags: z.array(z.string()).optional(),
    alert: z.array(z.string()).optional(),
    status: z.enum(["draft", "published", "private"]).default("draft"),
    relatedPosts: reference("posts").array().optional(),
  }),
  type: "content",
})

export const collections = { posts: posts }
