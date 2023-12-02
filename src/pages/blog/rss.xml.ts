import rss from "@astrojs/rss"
import type { APIRoute } from "astro"

import { SITE_URL } from "@/consts"
import { getAllPosts } from "@/lib/blogPost"

export const GET: APIRoute = async () => {
  const posts = await getAllPosts()

  return rss({
    title: "すしにっき",
    description: "すしがいろいろ書いているブログ",
    site: SITE_URL,
    customData: "<language>ja</language>",
    items: posts.map(({ slug, data }) => {
      return {
        title: data.title,
        link: `${SITE_URL}/blog/post/${slug}`,
        description: data.description,
        pubDate: data.createdAt,
      }
    }),
  })
}
