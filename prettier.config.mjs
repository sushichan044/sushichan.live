/** @type {import("prettier").Config} */
export default {
  // plugin
  plugins: ["prettier-plugin-astro"],
  // config
  semi: false,
  singleQuote: false,
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
}
