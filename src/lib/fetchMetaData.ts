import type { Metadata } from "fetch-site-metadata"

import scrape from "fetch-site-metadata"

const METADATA_CACHE = new Map<string, Metadata>()

const fetchMetaData = async (url: string) => {
  const cached = METADATA_CACHE.get(url)
  if (cached) {
    return cached
  }

  const metaDataResponse = await scrape(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; U; +Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
    },
    suppressAdditionalRequest: true,
  })

  METADATA_CACHE.set(url, metaDataResponse)
  return metaDataResponse
}

export { fetchMetaData }
