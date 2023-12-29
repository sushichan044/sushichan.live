//@ts-check

/** @type {import("prettier").Config} */
export default {
  overrides: [
    {
      files: ["*.css", "*.scss"],
      options: {
        singleQuote: false,
      },
    },
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  // plugin
  plugins: ["prettier-plugin-astro"],
  // config
  semi: false,
  singleQuote: false,
}
