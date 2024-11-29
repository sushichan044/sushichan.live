import type { APIRoute } from "astro";

import { type CollectionEntry, getEntry } from "astro:content";

import type { TrimExtension } from "../../../utils/string";

import {
  getAllPosts,
  getAllPreviewPosts,
} from "../../../features/blog/utils/post";
import { trimExtension } from "../../../utils/string";

export async function getStaticPaths() {
  const blogEntries = await getAllPosts();
  const previewEntries = await getAllPreviewPosts();
  const entries = Array.from(new Set([...blogEntries, ...previewEntries]));
  return entries.map(({ id }) => ({
    params: { slug: trimExtension(id) },
  }));
}

export const GET: APIRoute<
  Record<string, never>,
  { slug: TrimExtension<CollectionEntry<"posts">["id"]> }
> = async ({ params: { slug } }) => {
  const post = await getEntry("posts", slug);
  const title = post.data.title;
  const length = post.body.length;

  return new Response(JSON.stringify(`${title}の現在の文字数は${length}です`), {
    headers: {
      "content-type": "text/plain",
    },
    status: 200,
  });
};
