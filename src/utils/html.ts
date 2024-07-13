import _sanitizeHtml from "sanitize-html";

const sanitizeHTML = (html: string) => {
  return _sanitizeHtml(html);
};

export { sanitizeHTML };
