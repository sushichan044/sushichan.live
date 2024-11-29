import type { Config as DaisyConfig } from "daisyui";
import type { Config } from "tailwindcss";

import daisyui from "daisyui";
import createPlugin from "tailwindcss/plugin";

const config: Config = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  corePlugins: {
    preflight: false,
  },
  daisyui: {
    base: false,
    logs: false,
  } satisfies DaisyConfig,
  plugins: [
    daisyui,
    createPlugin((api) => {
      api.addVariant("hocus", ["&:hover", "&:focus"]);
    }),
    createPlugin((api) => {
      api.addUtilities({
        ".content-visibility-auto": {
          "content-visibility": "auto",
        },
        ".content-visibility-hidden": {
          "content-visibility": "hidden",
        },
        ".content-visibility-visible": {
          "content-visibility": "visible",
        },
      });
    }),
  ],
  theme: {
    extend: {
      aspectRatio: {
        "1/1": "1 / 1",
        "3/2": "3 / 2",
        "4/3": "4 / 3",
        "16/9": "16 / 9",
        "1200/630": "1200 / 630",
      },
      colors: {
        custom: {
          "little-dark": "rgba(226,226,226, 0.4)",
          "little-light": "rgba(32,32,32, 0.4)",
          "theme-dark": "#202020",
          "theme-light": "#fff",
        },
      },
      textColor: {
        dark: "#e2e2e2",
        light: "#08131a",
      },
    },
  },
};

export default config;
