// @ts-check

/** @typedef {import('eslint').ESLint.ConfigData} ConfigData */

/** @type {ConfigData} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  plugins: ["simple-import-sort", "perfectionist"],
  parserOptions: {
    project: "./tsconfig.json",
    extraFileExtensions: [".astro"],
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: ["./", "../", "~/"],
      },
    ],
    "perfectionist/sort-jsx-props": "error",
    "react/jsx-boolean-value": "warn",
    "react/jsx-curly-brace-presence": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ["*.astro"],
      // Allows Astro components to be parsed.
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
      extends: [
        "plugin:astro/recommended",
        "plugin:astro/jsx-a11y-recommended",
      ],
      env: {
        "astro/astro": true,
      },
      rules: {
        // override/add rules settings here, such as:
        "astro/no-set-html-directive": "error",
        "astro/no-unused-css-selector": "error",
        "astro/prefer-class-list-directive": "error",
        "perfectionist/sort-astro-attributes": [
          "error",
          {
            type: "natural",
            order: "asc",
            groups: ["multiline", "unknown", ["shorthand", "astro-shorthand"]],
          },
        ],
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
      extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
      rules: {
        "react/self-closing-comp": [
          "error",
          {
            component: true,
            html: true,
          },
        ],
      },
    },
    // ...
  ],
  ignorePatterns: [".eslintrc.cjs", "tailwind.config.ts"],
}
