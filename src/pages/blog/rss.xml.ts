import type { APIRoute } from "astro"

import { SITE_URL } from "@/consts"
import { getAllPosts } from "@/lib/blog/post"
import rss from "@astrojs/rss"

export const GET: APIRoute = async () => {
  const posts = await getAllPosts()

  return rss({
    customData: "<language>ja</language>",
    description: "すしがいろいろ書いているブログ",
    items: posts.map(({ data, slug }) => {
      return {
        description: data.description,
        link: `${SITE_URL}/blog/post/${slug}`,
        pubDate: data.createdAt,
        title: data.title,
      }
    }),
    site: SITE_URL,
    title: "すしにっき",
  })
}
