import cloudflare from "@astrojs/cloudflare"
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"
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
      "./src/components/mdx/Link.astro",
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
  adapter: cloudflare(),
  experimental: { devOverlay: true, contentCollectionCache: true },
  image: {
    service: {
      // https://docs.astro.build/en/guides/images/#add-simple-asset-support-for-cloudflare-deno-vercel-edge-and-netlify-edge
      entrypoint: "astro/assets/services/noop",
    },
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/sushi-chan/**",
      },
    ],
  },
  integrations: [...mdxIntegrations, sitemap(), react(), tailwind()],
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
    },
    gfm: true,
    remarkPlugins: [
      remarkEmoji,
      remarkMath,
      remarkUnwrapImages,
      remarkCodeTitles,
      remarkReadingTime,
    ],
    rehypePlugins: [rehypeKatex],
    remarkRehype: {
      footnoteLabel: "脚注",
      footnoteLabelProperties: { className: ["footnote-label"] },
      footnoteLabelTagName: "div",
      footnoteBackLabel: "本文へ戻る",
    },
  },
  output: "server",
  prefetch: {
    defaultStrategy: "viewport",
  },
  site: SITE_URL,
  server: {
    host: true,
  },
  vite: {
    build: {
      minify: false,
    },
    ssr: {
      noExternal: ["react-tweet", "fetch-site-metadata"],
    },
  },
})
