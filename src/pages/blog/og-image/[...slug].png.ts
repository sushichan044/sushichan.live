import type { APIRoute } from "astro"

import { getAllPosts } from "@/lib/blog/post"
import { getBlogOGImage } from "@/pages/blog/og-image/_getImage"
import { type CollectionEntry, getEntry } from "astro:content"

export async function getStaticPaths() {
  const blogEntries = await getAllPosts()
  return blogEntries.map(({ slug }) => ({
    params: { slug },
  }))
}

export const GET: APIRoute<
  Record<string, never>,
  { slug: CollectionEntry<"posts">["slug"] }
> = async ({ params }) => {
  const slug = params.slug
  if (!slug)
    return new Response(null, { status: 400, statusText: "Bad Request" })

  const post = await getEntry("posts", slug)
  if (!post) return new Response(null, { status: 404, statusText: "Not Found" })

  const png = await getBlogOGImage({ post })

  return new Response(png)
}
