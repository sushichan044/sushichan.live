// @ts-check

/** @typedef {import('eslint').ESLint.ConfigData} ConfigData */

/** @type {ConfigData} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: ["simple-import-sort"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  env: {
    es6: true,
    node: true,
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
        extraFileExtensions: [".astro"],
      },
      extends: ["plugin:astro/recommended"],
      rules: {
        // override/add rules settings here, such as:
        "astro/no-set-html-directive": "error",
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
      extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
    },
    // ...
  ],
  ignorePatterns: [".eslintrc.cjs", "tailwind.config.ts"],
  rules: {
    "simple-import-sort/imports": "error",
    "no-restricted-imports": [
      "error",
      {
        patterns: ["./", "../", "~/"],
      },
    ],
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
    "react/jsx-boolean-value": "warn",
    "react/jsx-curly-brace-presence": "error",
    "react/jsx-sort-props": "warn",
  },
}
