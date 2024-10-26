import type { ReadTimeResults } from "reading-time";

import { declareLet } from "@/utils/declareLet";
import { roundToNearestMultiple } from "@/utils/number";
import { marked } from "marked";

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
