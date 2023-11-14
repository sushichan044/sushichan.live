import { marked } from "marked"

async function parseMarkdown(markdown: string) {
  return await marked(markdown, { async: true })
}

async function parseMarkdownArray(array: string[]) {
  return await Promise.all(array.map((item) => parseMarkdown(item)))
}

export { parseMarkdown, parseMarkdownArray }
