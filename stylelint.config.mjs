/** @type {import("stylelint").Config} */
export default {
  extends: [
    "stylelint-config-recommended",
    "stylelint-config-standard-scss",
    "stylelint-config-sass-guidelines",
    "stylelint-config-tailwindcss/scss",
    "stylelint-config-recess-order",
    "stylelint-config-html/astro",
    "stylelint-config-html/html",
  ],
  ignoreFiles: ["**/node_modules/**"],
  plugins: [
    "stylelint-a11y",
    "stylelint-declaration-block-no-ignored-properties",
    "stylelint-value-no-unknown-custom-properties",
  ],
  rules: {
    "a11y/font-size-is-readable": true,
    "a11y/no-obsolete-attribute": true,
    "a11y/no-obsolete-element": true,
    "a11y/no-outline-none": true,
    "a11y/selector-pseudo-class-focus": true,
    "at-rule-no-unknown": null,
    "color-named": "never",
    "csstools/value-no-unknown-custom-properties": [
      null,
      {
        importFrom: ["./styles/globals.scss", "./styles/_variables.scss"],
      },
    ],
    "declaration-property-value-no-unknown": true,
    "plugin/declaration-block-no-ignored-properties": true,
    "scss/at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
        ],
      },
    ],
  },
}
