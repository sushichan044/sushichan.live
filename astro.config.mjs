import cloudflare from "@astrojs/cloudflare"
import mdx from "@astrojs/mdx"
import prefetch from "@astrojs/prefetch"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"
import AutoImport from "astro-auto-import"

// eslint-disable-next-line no-restricted-imports
import { SITE_URL } from "./src/consts"

const mdxIntegrations = [
  AutoImport({
    imports: [
      "./src/components/common/BudouX.astro",
      "./src/components/common/Icon.astro",
      "./src/components/ui/card/MessageCard.astro",
      "./src/components/ui/card/PlayerCard.astro",
      "./src/components/ui/card/TextCard.astro",
      // "./src/components/ui/card/UrlCard.astro",
      "./src/components/utils/Spoiler.astro",
    ],
  }),
  mdx(),
]

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
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
  integrations: [
    ...mdxIntegrations,
    sitemap(),
    react(),
    tailwind(),
    prefetch(),
  ],
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
  output: "server",
  site: SITE_URL,
  server: {
    host: true,
  },
  vite: {
    build: {
      minify: false,
    },
  },
})
