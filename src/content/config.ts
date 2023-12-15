import { defineCollection, reference, z } from "astro:content"

const posts = defineCollection({
  schema: z.object({
    alert: z.array(z.string()).optional(),
    createdAt: z.coerce.date(),
    description: z.string(),
    relatedPosts: reference("posts").array().optional(),
    status: z
      .enum(["draft", "published", "private", "preview"])
      .default("draft"),
    tags: z.array(z.string()).optional(),
    thumbnail: z.string().url(),
    title: z.string(),
    updatedAt: z.coerce.date().optional(),
  }),
  type: "content",
})

export const collections = { posts: posts }
