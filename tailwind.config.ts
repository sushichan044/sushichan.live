import type { Config } from "tailwindcss"

const config: Config = {
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
    },
  },
  plugins: [],
}

export default config
