import type { OgObject } from "open-graph-scraper/dist/lib/types"

import scrape from "fetch-site-metadata"
import OGS from "open-graph-scraper"

const fetchMetaData = async (url: string) => {
  const res = await scrape(url)
  return res
}

const fetchMetaDataWithOGS = async (url: string): Promise<OgObject | null> => {
  const options = { url }
  const { error, result } = await OGS(options)
  return error ? null : result
}

export { fetchMetaData, fetchMetaDataWithOGS }
