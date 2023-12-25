import type { APIRoute } from "astro"

import { getAllPosts } from "@/lib/blogPost"
import { getBlogOGImage } from "@/pages/blog/og-image/_getImage"
import { getEntry } from "astro:content"

export async function getStaticPaths() {
  const blogEntries = await getAllPosts()
  return blogEntries.map((entry) => ({
    params: { slug: entry.slug },
  }))
}

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug
  if (!slug) return new Response(null, { status: 404, statusText: "Not Found" })

  const post = await getEntry("posts", slug)
  if (!post) return new Response(null, { status: 404, statusText: "Not Found" })

  const png = await getBlogOGImage({ post })

  return new Response(png)
}

export const prerender = true
