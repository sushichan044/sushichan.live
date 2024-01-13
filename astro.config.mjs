//@ts-check

import cloudflare from "@astrojs/cloudflare"
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import { defineConfig, passthroughImageService } from "astro/config"
import AutoImport from "astro-auto-import"
import rehypeKatex from "rehype-katex"
import remarkEmoji from "remark-emoji"
import remarkCodeTitles from "remark-flexible-code-titles"
import remarkMath from "remark-math"
import remarkUnwrapImages from "remark-unwrap-images"

// eslint-disable-next-line no-restricted-imports
import { SITE_URL } from "./src/consts"
// eslint-disable-next-line no-restricted-imports
import { remarkReadingTime } from "./src/lib/remarkReadingTime.mjs"

const mdxIntegrations = [
  AutoImport({
    imports: [
      "./src/components/common/BudouX.astro",
      "./src/components/common/Icon.astro",
      "./src/components/element/Link.astro",
      "./src/components/ui/card/AdventarCard.astro",
      "./src/components/ui/card/MessageCard.astro",
      "./src/components/ui/card/PlayerCard.astro",
      "./src/components/ui/card/SpotifyCard.astro",
      "./src/components/ui/card/TextCard.astro",
      "./src/components/ui/card/TimelineCard.astro",
      "./src/components/ui/card/TweetCard.astro",
      "./src/components/ui/card/UrlCard.astro",
      "./src/components/ui/Collapse.astro",
      "./src/components/utils/Spoiler.astro",
    ],
  }),
  mdx(),
]

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    runtime: {
      mode: "off",
    },
  }),
  cacheDir: "./.astro-cache",
  experimental: { contentCollectionCache: true },
  image: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        pathname: "/sushi-chan/**",
        protocol: "https",
      },
    ],
    service: passthroughImageService(),
  },
  integrations: [...mdxIntegrations, sitemap(), react(), tailwind()],
  markdown: {
    gfm: true,
    rehypePlugins: [rehypeKatex],
    remarkPlugins: [
      remarkEmoji,
      remarkMath,
      remarkUnwrapImages,
      remarkCodeTitles,
      remarkReadingTime,
    ],
    remarkRehype: {
      footnoteBackLabel: "本文へ戻る",
      footnoteLabel: "脚注",
      footnoteLabelProperties: { className: ["footnote-label"] },
      footnoteLabelTagName: "div",
    },
    shikiConfig: {
      theme: "one-dark-pro",
    },
  },
  outDir: "./dist",
  output: "hybrid",
  prefetch: {
    defaultStrategy: "hover",
  },
  server: {
    host: true,
  },
  site: SITE_URL,
  vite: {
    build: {
      minify: false,
    },
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    ssr: {
      noExternal: ["fetch-site-metadata", "react-tweet"],
    },
  },
})
