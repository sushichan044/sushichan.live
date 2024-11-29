import type { ReadTimeResults } from "reading-time";

import { marked } from "marked";

import { declareLet } from "./declareLet";
import { roundToNearestMultiple } from "./number";

async function parseMarkdown(markdown: string) {
  return await marked(markdown, { async: true });
}

async function parseMarkdownArray(array: string[]) {
  return await Promise.all(array.map(async (item) => parseMarkdown(item)));
}

const roundReadTime = (
  readTime?: ReadTimeResults,
  multiple?: number,
): number | undefined => {
  const rounded = declareLet(() => {
    if (readTime === undefined) return undefined;
    return roundToNearestMultiple(readTime.minutes, multiple ?? 5);
  });
  return rounded === 0 ? 1 : rounded;
};

export { parseMarkdownArray, roundReadTime };
