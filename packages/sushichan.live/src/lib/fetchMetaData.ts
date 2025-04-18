import ogs from "open-graph-scraper-lite";

type ImageData = {
  alt: string | undefined;
  height: string | undefined;
  src: string;
  width: string | undefined;
};

export type MetaData = {
  description: string | undefined;
  icon: string | undefined;
  image: ImageData | undefined;
  title: string | undefined;
};

const METADATA_CACHE = new Map<string, MetaData>();

const fetchMetaData = async (url: string): Promise<MetaData> => {
  const cached = METADATA_CACHE.get(url);
  if (cached) {
    return cached;
  }

  let html: string | null = null;
  try {
    const res = await fetch(url, {
      headers: {
        "Accept": "text/html",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; +Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    });
    html = await res.text();
  } catch (error) {
    console.error(error);
  }

  if (html == null) {
    throw new Error(`Failed to fetch Metadata from ${url}`);
  }

  const res = await ogs({
    html,
  });
  if (res.error) {
    throw new Error("Failed to fetch metadata");
  }

  const imageInfo = (() => {
    const img = res.result.ogImage?.at(0);
    if (img == null) {
      return undefined;
    }
    return {
      alt: "",
      height: img.height?.toString(),
      src: new URL(img.url, url).toString(),
      width: img.width?.toString(),
    };
  })();

  const faviconUrl = (() => {
    if (res.result.favicon == null || res.result.favicon === "") {
      return undefined;
    }
    return new URL(res.result.favicon, url).toString();
  })();

  const response = {
    description: res.result.ogDescription,
    icon: faviconUrl,
    image: imageInfo,
    title: res.result.ogTitle,
  };

  METADATA_CACHE.set(url, response);
  return response;
};

export { fetchMetaData };
