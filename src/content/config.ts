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
      // 記事ファイルすべてにtypeフィールドを追加するのが苦しいので、
      // 暗黙的にblogを追加する
      // .default()は暗黙的にundefinedを許容するので、optional()で明示的に許容する
      type: z.literal("blog").optional().default("blog"),
    }),
  ),
  type: "content",
})

const presentations = defineCollection({
  schema: baseSchema.merge(
    z.object({
      // 登壇ファイルすべてにtypeフィールドを追加するのが苦しいので、
      // 暗黙的にpresentationを追加する
      // .default()は暗黙的にundefinedを許容するので、optional()で明示的に許容する
      type: z.literal("presentation").optional().default("presentation"),
      url: z.string().url(),
    }),
  ),
  type: "data",
})

export const collections = { posts: posts, presentations: presentations }
