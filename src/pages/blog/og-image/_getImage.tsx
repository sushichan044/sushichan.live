import type { CollectionEntry } from "astro:content"

import { Resvg } from "@resvg/resvg-js"
import React from "react"
import satori from "satori"

type Options = {
  post: CollectionEntry<"posts">
}

export async function getBlogOGImage({ post }: Options) {
  const { title } = post.data
  const fontData = await fetchFont(title, "Noto+Sans+JP", 400)

  const svg = await satori(
    <div
      style={{
        alignItems: "center",
        display: "flex",
        fontSize: 64,
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {title}
    </div>,
    {
      fonts: [
        {
          data: fontData,
          name: "Noto Sans JP",
          style: "normal",
          weight: 400,
        },
      ],
      height: 630,
      width: 1200,
    },
  )

  const resvg = new Resvg(svg)

  return resvg.render().asPng()
}

async function fetchFont(
  text: string,
  font: string,
  weight: number,
): Promise<ArrayBuffer> {
  const API = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(
    text,
  )}`

  const css = await (
    await fetch(API, {
      headers: {
        // Make sure it returns TTF.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    })
  ).text()

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (!resource) {
    throw new Error("Failed to fetch font")
  }

  const res = await fetch(resource[1])

  return res.arrayBuffer()
}
