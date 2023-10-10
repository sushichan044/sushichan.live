import cloudflare from "@astrojs/cloudflare"
import mdx from "@astrojs/mdx"
import prefetch from "@astrojs/prefetch"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"

// eslint-disable-next-line no-restricted-imports
import { SITE_URL } from "./src/consts"

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [mdx(), sitemap(), react(), tailwind(), prefetch()],
  output: "server",
  adapter: cloudflare(),
  vite: {
    build: {
      minify: false,
    },
  },
  image: {
    service: {
      // https://docs.astro.build/en/guides/images/#add-simple-asset-support-for-cloudflare-deno-vercel-edge-and-netlify-edge
      entrypoint: "astro/assets/services/noop",
    },
  },
})
