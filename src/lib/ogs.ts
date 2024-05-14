import type { RequestInit as UndiciRequestInit } from "undici";

import { declareLet } from "@/utils/declareLet";
import ogs from "open-graph-scraper";

type ImageData = {
  height: number | undefined;
  src: string;
  width: number | undefined;
};

type Metadata = {
  description: string | undefined;
  favicon: string | undefined;
  image: ImageData | undefined;
  title: string | undefined;
};

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36";

const DEFAULT_FETCH_OPTIONS = {
  headers: {
    "User-Agent": UA,
  },
} as const satisfies UndiciRequestInit;

export async function fetchMetaData(
  url: string,
  requestInit?: UndiciRequestInit,
): Promise<Metadata | null> {
  // const targetUrl = new URL(url)

  const ogsResult = await ogs({
    customMetaTags: [
      { fieldName: "themeColor", multiple: false, property: "theme-color" },
    ],
    fetchOptions: {
      ...DEFAULT_FETCH_OPTIONS,
      ...requestInit,
    },
    timeout: 10000,
    url,
  });
  if (ogsResult.error) {
    console.error("Error fetching metadata");
    return null;
  }

  const { result } = ogsResult;
  console.debug("Metadata result", result);

  const title = result.ogTitle;
  const description = result.ogDescription;
  const faviconSrc = new URL("favicon.ico", url).toString();

  const image = declareLet(() => {
    const img = result.ogImage?.[0];
    if (!img) {
      return undefined;
    }

    const imageData = {
      height: img.height,
      src: img.url,
      width: img.width,
    } as const satisfies ImageData;

    return imageData;
  });

  const returnValue = {
    description,
    favicon: faviconSrc,
    image,
    title,
  } as const satisfies Metadata;

  return returnValue;
}
