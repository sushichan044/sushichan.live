import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig, envField } from "astro/config";
import AutoImport from "astro-auto-import";
import expressiveCode from "astro-expressive-code";
import rehypeKatex from "rehype-katex";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkEmoji from "remark-emoji";
import remarkMath from "remark-math";
import Icons from "unplugin-icons/vite";

import { SITE_URL } from "./src/consts";
// @ts-expect-error no types
import { remarkReadingTime } from "./src/lib/remarkReadingTime.mjs";

const mdxIntegrations = [
  AutoImport({
    imports: [
      "./src/components/common/Icon.astro",
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
  adapter: cloudflare({ imageService: "passthrough" }),
  experimental: {
    clientPrerender: true,
    contentCollectionCache: true,
    contentIntellisense: true,
    contentLayer: true,
    env: {
      schema: {
        CLOUDINARY_API_KEY: envField.string({
          access: "secret",
          context: "server",
        }),
        CLOUDINARY_API_SECRET: envField.string({
          access: "secret",
          context: "server",
        }),
        CLOUDINARY_CLOUD_NAME: envField.string({
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
    serverIslands: true,
  },
  image: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        pathname: "/sushi-chan/**",
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
  output: "hybrid",
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
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    plugins: [
      Icons({
        compiler: "astro",
      }),
    ],
    ssr: {
      external: ["@resvg/resvg-js", "cloudinary"],
      noExternal: ["react-tweet"],
    },
  },
});
