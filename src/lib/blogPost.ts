import { type CollectionEntry, getCollection } from "astro:content"

type sortAction = (
  a: CollectionEntry<"posts">,
  b: CollectionEntry<"posts">,
) => number

const getAllPosts = async (sortAction?: sortAction) => {
  const posts = await getCollection("posts", ({ data }) => {
    if (import.meta.env.DEV) return true

    if (
      import.meta.env.SHOW_ALL_POST === true ||
      import.meta.env.SHOW_ALL_POST === "true"
    ) {
      return data.status !== "private"
    }

    return data.status === "published"
  })

  if (sortAction !== undefined) {
    return posts.sort(sortAction)
  }

  return posts
}

const getPostsWithTags = async (
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

export { getAllPosts, getAllTags, getPostsWithTags }
