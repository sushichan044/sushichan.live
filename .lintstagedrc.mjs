// @ts-check

import { ESLint } from "eslint"

const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint()
  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslint.isPathIgnored(file)
    }),
  )
  const filteredFiles = files.filter((_, i) => !isIgnored[i])
  return filteredFiles.join(" ")
}

/** @type {import('lint-staged').Config} */
const config = {
  "**/*.{jsx,tsx}": async (files) => {
    const filesToLint = await removeIgnoredFiles(files)
    return [
      `eslint --max-warnings=0 ${filesToLint}`,
      "npm run eslint:check",
      "npm run format:check",
      "npm run markuplint:check",
    ]
  },
  "**/*.{js,cjs,mjs,ts,cts,mts}": async (files) => {
    const filesToLint = await removeIgnoredFiles(files)
    return [
      `eslint --max-warnings=0 ${filesToLint}`,
      "npm run eslint:check",
      "npm run format:check",
    ]
  },
  "./**/*.astro": [
    "npm run eslint:check",
    "npm run format:check",
    "npm run markuplint:check",
    "npm run stylelint:check",
  ],
  "./**/*.{css,scss}": "npm run stylelint:check",
}

export default config
