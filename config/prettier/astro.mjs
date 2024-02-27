// eslint-disable-next-line no-restricted-imports
import normal from "./index.mjs"

/** @type {import("prettier").Config} */
const config = {
  ...normal,
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  plugins: ["prettier-plugin-astro"],
}

export default config
