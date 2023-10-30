import React from "react"
import { EmbeddedTweet } from "react-tweet"

import type { TweetProps } from "@/components/react/ui/twitter/types"

const TWEET_API_URL = process.env.TWEET_API_URL

const TweetBase = ({ id }: TweetProps) => {
  if (!TWEET_API_URL) return <></>

  try {
    const res = await fetch(`${TWEET_API_URL}/tweet/${id}`)
    const isJson = res.headers.get("content-type")?.includes("application/json")
    const data = isJson ? await res.json() : undefined
    if (res.ok) {
      return <EmbeddedTweet tweet={data} />
    }
  } catch (e) {
    console.error(e)
    return <></>
  }

  return <></>
}

export { TweetBase }
