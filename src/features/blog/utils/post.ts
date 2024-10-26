import type { TrimExtension } from "@/utils/string";

import { declareLet } from "@/utils/declareLet";
import { type CollectionEntry, getCollection } from "astro:content";
import { SHOW_DRAFT_POST } from "astro:env/server";

type sortAction = (
  a: CollectionEntry<"posts">,
  b: CollectionEntry<"posts">,
) => number;

type GetAllPostsOption = {
  sortAction?: sortAction;
};

const getAllPosts = async (options?: GetAllPostsOption) => {
  const { sortAction } = options ?? {};

  const posts = await getCollection("posts", ({ data }) => {
    if (import.meta.env.DEV) return true;
    if (SHOW_DRAFT_POST) {
      return data.status !== "private" && data.status !== "preview";
    }

    return data.status === "published";
  });

  if (sortAction !== undefined) {
    return posts.sort(sortAction);
  }

  return posts;
};

const getAllPreviewPosts = async (sortAction?: sortAction) => {
  const posts = await getCollection("posts", ({ data }) => {
    return data.status === "preview";
  });

  if (sortAction !== undefined) {
    return posts.sort(sortAction);
  }

  return posts;
};

const getPostsByTags = async (
  tags: string[] | undefined,
  sortAction?: sortAction,
) => {
  const posts = await getAllPosts({ sortAction });
  if (tags === undefined) {
    return posts;
  }
  const postsWithTag = posts.filter(({ data: { tags: postTags } }) => {
    if (postTags === undefined) {
      return false;
    }
    return tags.some((tag) => postTags.includes(tag));
  });

  return postsWithTag;
};

const getAllTags = async () => {
  const posts = await getAllPosts();
  const tags = posts.flatMap(({ data: { tags } }) => {
    if (tags !== undefined) {
      return tags;
    }
    return [];
  });
  return [...new Set(tags)];
};

type GetOgpImageOptions = {
  baseUrl: string | URL;
  extension?: string;
};

const getPostOgpImage = (
  slug: TrimExtension<CollectionEntry<"posts">["id"]>,
  { baseUrl, extension }: GetOgpImageOptions,
) => {
  const origin =
    baseUrl instanceof URL ? baseUrl.origin : new URL(baseUrl).origin;
  const OgpUrlObj = new URL(`/blog/og-image/${slug}`, origin);
  const OgpUrl = declareLet(() => {
    const urlString = OgpUrlObj.toString();
    if (extension != null) {
      return `${urlString}.${extension}`;
    }
    return urlString;
  });
  return OgpUrl;
};

export {
  getAllPosts,
  getAllPreviewPosts,
  getAllTags,
  getPostOgpImage,
  getPostsByTags,
};
