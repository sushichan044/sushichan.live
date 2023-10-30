"use client"

import React, { useEffect, useRef } from "react"

type TimelineProps = {
  id: string
  theme: "dark" | "light"
}

const Timeline: React.FC<TimelineProps> = ({ id, theme }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // @ts-expect-error twttr is not defined
    window.twttr?.widgets.load(ref.current)
  }, [id])

  return (
    <div
      className="overflow-hidden rounded-[calc(0.75rem+1px)] text-center"
      dangerouslySetInnerHTML={{
        __html: generateEmbedHtml(id, theme),
      }}
      ref={ref}
    />
  )
}

const generateEmbedHtml = (id: string, theme: "dark" | "light"): string => {
  return `<a class="twitter-timeline" data-height="450" data-lang="ja" data-theme="${theme}" href="https://twitter.com/${id}?ref_src=twsrc%5Etfw">Tweets by ${id}</a>`
}

export default Timeline
