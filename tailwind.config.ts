import type { Config } from "tailwindcss"

import daisyui, { type Config as DaisyConfig } from "daisyui"

const config: Config = {
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      aspectRatio: {
        "1200/630": "1200 / 630",
        "16/9": "16 / 9",
        "4/3": "4 / 3",
        "3/2": "3 / 2",
        "1/1": "1 / 1",
      },
      textColor: {
        light: "#1a1a1c",
        dark: "#e2e2e2",
      },
      colors: {
        custom: {
          "theme-light": "#202020",
          "theme-dark": "#e2e2e2",
          "little-light": "rgba(32,32,32, 0.4)",
          "little-dark": "rgba(226,226,226, 0.4)",
        },
      },
    },
  },
  plugins: [daisyui],
  // daisyui: {} satisfies DaisyConfig,
}

export default config
