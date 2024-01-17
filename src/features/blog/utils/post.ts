import { declareLet } from "@/utils/declareLet"
import { type CollectionEntry, getCollection } from "astro:content"

type sortAction = (
  a: CollectionEntry<"posts">,
  b: CollectionEntry<"posts">,
) => number

const getAllPosts = async (sortAction?: sortAction) => {
  const posts = await getCollection("posts", ({ data }) => {
    if (import.meta.env.DEV) return true

    if (
      import.meta.env.SHOW_DRAFT_POST === true ||
      import.meta.env.SHOW_DRAFT_POST === "true"
    ) {
      return data.status !== "private" && data.status !== "preview"
    }

    return data.status === "published"
  })

  if (sortAction !== undefined) {
    return posts.sort(sortAction)
  }

  return posts
}

const getAllPreviewPosts = async (sortAction?: sortAction) => {
  const posts = await getCollection("posts", ({ data }) => {
    return data.status === "preview"
  })

  if (sortAction !== undefined) {
    return posts.sort(sortAction)
  }

  return posts
}

const getPostsByTags = async (
  tags: string[] | undefined,
  sortAction?: sortAction,
) => {
  const posts = await getAllPosts()
  if (tags === undefined) {
    return posts
  }
  const postsWithTag = posts.filter(({ data: { tags: postTags } }) => {
    if (postTags === undefined) {
      return false
    }
    return tags.some((tag) => postTags.includes(tag))
  })

  if (sortAction !== undefined) {
    return postsWithTag.sort(sortAction)
  }
  return postsWithTag
}

const getAllTags = async () => {
  const posts = await getAllPosts()
  const tags = posts.flatMap(({ data: { tags } }) => {
    if (tags !== undefined) {
      return tags
    }
    return []
  })
  return [...new Set(tags)]
}

type GetOgpImageOptions = {
  baseUrl: URL | string
  extension?: string
}

const getPostOgpImage = (
  slug: string,
  { baseUrl, extension }: GetOgpImageOptions,
) => {
  const origin =
    baseUrl instanceof URL ? baseUrl.origin : new URL(baseUrl).origin
  const OgpUrlObj = new URL(`/blog/og-image/${slug}`, origin)
  const OgpUrl = declareLet(() => {
    const urlString = OgpUrlObj.toString()
    if (extension != null) {
      return `${urlString}.${extension}`
    }
    return urlString
  })
  return OgpUrl
}

export {
  getAllPosts,
  getAllPreviewPosts,
  getAllTags,
  getPostOgpImage,
  getPostsByTags,
}
