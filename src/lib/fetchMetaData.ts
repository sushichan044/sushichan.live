import scrape from "fetch-site-metadata"

const fetchMetaData = async (url: string) => {
  const res = await scrape(url)
  return res
}

export { fetchMetaData }
