import scrape from "fetch-site-metadata"

const fetchMetaData = async (url: string) => {
  const res = await scrape(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
    },
    suppressAdditionalRequest: true,
  })
  return res
}

export { fetchMetaData }
