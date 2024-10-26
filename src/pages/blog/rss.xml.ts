import type { APIRoute } from "astro";

import { SITE_URL } from "@/consts";
import { getAllPosts } from "@/features/blog/utils/post";
import { trimExtension } from "@/utils/string";
import rss from "@astrojs/rss";

export const GET: APIRoute = async () => {
  const posts = await getAllPosts();

  return rss({
    customData: "<language>ja</language>",
    description: "すしがいろいろ書いているブログ",
    items: posts.map(({ data, id }) => {
      return {
        description: data.description,
        link: `${SITE_URL}/blog/post/${trimExtension(id)}`,
        pubDate: data.createdAt,
        title: data.title,
      };
    }),
    site: SITE_URL,
    title: "すしにっき",
  });
};
