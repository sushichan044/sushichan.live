"use client"

import React, { useEffect, useRef } from "react"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TweetEmbed: React.FC<{ id: string; theme: "dark" | "light" }> = ({
  id,
  theme,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // @ts-expect-error twttr is not defined
    window.twttr?.widgets.load(ref.current)
  }, [id])

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: generateEmbedHtml(id, theme),
      }}
      ref={ref}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  )
}

const generateEmbedHtml = (id: string, theme: "dark" | "light"): string => {
  if (!/^\d+$/u.test(id)) {
    throw new Error(`Invalid tweet ID: ${id}`)
  }

  return `<blockquote class="twitter-tweet" data-lang="ja" data-theme="${theme}" data-dnt="true"><a href="https://twitter.com/i/status/${id}"></a></blockquote>`
}
