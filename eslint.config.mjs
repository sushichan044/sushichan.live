import react from "@virtual-live-lab/eslint-config/presets/react";
import ts from "@virtual-live-lab/eslint-config/presets/ts";
import astroParser from "astro-eslint-parser";
import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";
import * as extraParser from "typescript-eslint-parser-for-extra-files";

const tsIgnores = ts.map((c) => c.ignores ?? []).flat();

export default tseslint.config(
  {
    extends: [
      ...eslintPluginAstro.configs["flat/recommended"],
      ...eslintPluginAstro.configs["flat/jsx-a11y-strict"],
      ...ts,
    ],
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: extraParser,
        project: true,
      },
    },
  },
  {
    extends: [...react],
    files: ["**/*.{ts,tsx}"],
    ignores: [...tsIgnores, ".astro/**"],
    languageOptions: {
      parser: extraParser,
      parserOptions: {
        project: true,
      },
    },
  },
);
