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
    imports: [],
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
  vite: {
    build: {
      minify: false,
    },
  },
})
