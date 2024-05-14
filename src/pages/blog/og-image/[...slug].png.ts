import type { APIRoute } from "astro";

import { getAllPosts } from "@/features/blog/utils/post";
import { getBlogOGImage } from "@/pages/blog/og-image/_getImage";
import { type CollectionEntry, getEntry } from "astro:content";

export async function getStaticPaths() {
  const blogEntries = await getAllPosts();
  return blogEntries.map(({ slug }) => ({
    params: { slug },
  }));
}

export const GET: APIRoute<
  Record<string, never>,
  { slug: CollectionEntry<"posts">["slug"] }
> = async ({ params: { slug } }) => {
  const post = await getEntry("posts", slug);
  const png = await getBlogOGImage({ post });

  return new Response(png);
};
