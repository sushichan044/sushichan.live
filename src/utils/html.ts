import { loadDefaultJapaneseParser } from "budoux";
import _sanitizeHtml from "sanitize-html";

const sanitizeHTML = (html: string) => {
  return _sanitizeHtml(html);
};

const applyBudouXToHTML = (html: string): string => {
  const parser = loadDefaultJapaneseParser();
  return parser.translateHTMLString(html);
};

export { applyBudouXToHTML, sanitizeHTML };
