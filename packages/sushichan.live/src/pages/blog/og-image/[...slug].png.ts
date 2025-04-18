import type { APIRoute } from "astro";

import { type CollectionEntry, getEntry } from "astro:content";

import type { TrimExtension } from "../../../utils/string";

import { getBlogOGImage } from "./_getImage";

export const GET: APIRoute<
  Record<string, never>,
  { slug: TrimExtension<CollectionEntry<"posts">["id"]> }
> = async ({ params: { slug } }) => {
  const post = await getEntry("posts", slug);
  if (post == null) {
    return new Response("Not found", { status: 404 });
  }

  const png = await getBlogOGImage({ post });

  return new Response(png);
};
