import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import expressiveCode from "astro-expressive-code";
import { defineConfig, envField } from "astro/config";
import rehypeKatex from "rehype-katex";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkEmoji from "remark-emoji";
import remarkMath from "remark-math";
import nodeExternals from "rollup-plugin-node-externals";
import cloudflare from "@astrojs/cloudflare";
import { cloudflare as cloudflareVite } from "@cloudflare/vite-plugin";
import Icons from "unplugin-icons/vite";

import { SITE_URL } from "./src/consts";
import { remarkReadingTime } from "./src/lib/remarkReadingTime.js";

const mdxIntegrations = [
  AutoImport({
    imports: [
      "./src/components/element/Link.astro",
      "./src/components/ui/Message.astro",
      "./src/components/ui/card/AdventarCard.astro",
      "./src/components/ui/card/PlayerCard.astro",
      "./src/components/ui/card/SpotifyCard.astro",
      "./src/components/ui/card/TextCard.astro",
      "./src/components/ui/card/TimelineCard.astro",
      "./src/components/ui/card/TweetCard.astro",
      "./src/components/ui/card/UrlCard.astro",
      "./src/components/ui/card/NewUrlCard.astro",
      "./src/components/ui/Collapse.astro",
      "./src/components/utils/Spoiler.astro",
    ],
  }),
  mdx(),
];

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
      configPath: "./wrangler.jsonc",
    },
    imageService: "compile",
  }),

  env: {
    schema: {
      CLOUDINARY_API_SECRET: envField.string({
        access: "secret",
        context: "server",
      }),
      PUBLIC_CLOUDINARY_API_KEY: envField.string({
        access: "secret",
        context: "server",
      }),
      PUBLIC_CLOUDINARY_CLOUD_NAME: envField.string({
        access: "public",
        context: "server",
      }),
      SHOW_DRAFT_POST: envField.boolean({
        access: "public",
        context: "server",
        default: false,
        optional: true,
      }),
    },
    validateSecrets: true,
  },

  experimental: {
    clientPrerender: true,
    contentIntellisense: true,
    csp: true,
  },

  image: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        pathname: "/sushichan044/**",
        protocol: "https",
      },
    ],
  },

  integrations: [
    // expressiveCode config is moved to ec.config.mjs
    expressiveCode(),
    ...mdxIntegrations,
    sitemap(),
    react(),
    tailwind(),
  ],

  legacy: {
    collections: true,
  },

  markdown: {
    gfm: true,
    rehypePlugins: [rehypeUnwrapImages, rehypeKatex],
    remarkPlugins: [remarkEmoji, remarkMath, remarkReadingTime],
    remarkRehype: {
      footnoteBackLabel: "本文へ戻る",
      footnoteLabel: "脚注",
      footnoteLabelProperties: {
        className: ["footnote-label"],
      },
      footnoteLabelTagName: "div",
    },
    // shikiConfig: {
    //   theme: "one-dark-pro",
    // },
  },

  outDir: "./dist",
  output: "server",

  prefetch: {
    defaultStrategy: "hover",
  },

  security: {
    checkOrigin: true,
  },

  server: {
    host: true,
  },

  site: SITE_URL,

  vite: {
    build: {
      minify: false,
    },
    plugins: [
      // Make sure to place nodeExternals first
      nodeExternals({ deps: false }),
      // Then place other plugins below
      // @ts-expect-error type mismatch
      Icons({
        compiler: "astro",
      }),
    ],
    resolve: {
      // Cloudflare での SSR 時に React がおかしくなるので対策しておく
      ...(import.meta.env.PROD
        ? {
            alias: {
              "react-dom/server": "react-dom/server.edge",
            },
          }
        : {}),
    },
  },
});
