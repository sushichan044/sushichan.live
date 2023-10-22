import _sanitizeHtml from "sanitize-html"
import { loadDefaultJapaneseParser } from "budoux"

const sanitizeHTML = (html: string) => {
  return _sanitizeHtml(html)
}

const applyBudouXToHTML = (html: string): string => {
  const parser = loadDefaultJapaneseParser()
  return parser.translateHTMLString(html)
}

export { sanitizeHTML, applyBudouXToHTML }
