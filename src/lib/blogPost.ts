import { getCollection } from "astro:content"

const getAllPosts = async () => {
  const posts = await getCollection("posts", ({ data }) => {
    return import.meta.env.DEV || data.status === "published"
  })
  return posts
}

const getPostsWithTags = async (tags: string[] | undefined) => {
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

export { getAllPosts, getPostsWithTags, getAllTags }
