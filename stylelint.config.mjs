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
  plugins: [
    "stylelint-a11y",
    "stylelint-declaration-block-no-ignored-properties",
    "stylelint-value-no-unknown-custom-properties",
  ],
  rules: {
    "at-rule-no-unknown": null,
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
    "declaration-property-value-no-unknown": true,
    "color-named": "never",
    "a11y/font-size-is-readable": true,
    "a11y/no-obsolete-attribute": true,
    "a11y/no-obsolete-element": true,
    "a11y/no-outline-none": true,
    "a11y/selector-pseudo-class-focus": true,
    "plugin/declaration-block-no-ignored-properties": true,
    "csstools/value-no-unknown-custom-properties": [
      null,
      {
        importFrom: ["./styles/globals.scss", "./styles/_variables.scss"],
      },
    ],
  },
  ignoreFiles: ["**/node_modules/**"],
}
