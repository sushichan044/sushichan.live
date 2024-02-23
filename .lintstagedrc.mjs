// @ts-check

import { ESLint } from "eslint"
import path from "path"

/** @type {(files: string[]) => Promise<string[]>} */
const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint()
  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslint.isPathIgnored(file)
    }),
  )
  const filteredFiles = files.filter((_, i) => !isIgnored[i])
  return filteredFiles
}

/** @type {(files: string[]) => string[]} */
const convertToAbsolutePath = (files) =>
  files.map((file) => path.relative(process.cwd(), file))

/** @type {(files: string[]) => string} */
const buildEslintCommand = (files) =>
  `eslint --max-warnings 0 ${convertToAbsolutePath(files).join(" ")}`

/** @type {(files: string[]) => string} */
const buildPrettierCommand = (files) =>
  `prettier ${convertToAbsolutePath(files).join(" ")} --check`

/** @type {import('lint-staged').Config} */
const config = {
  "**/*.{js,cjs,mjs,ts,cts,mts}": async (files) => {
    const filesToLint = await removeIgnoredFiles(files)
    if (filesToLint.length === 0) {
      return []
    }
    return [buildEslintCommand(filesToLint), buildPrettierCommand(filesToLint)]
  },
  "**/*.{jsx,tsx}": async (files) => {
    const filesToLint = await removeIgnoredFiles(files)
    if (filesToLint.length === 0) {
      return []
    }
    return [
      buildEslintCommand(filesToLint),
      buildPrettierCommand(filesToLint),
      // "npm run markuplint:check",
    ]
  },
  "./**/*.astro": (files) => [
    buildEslintCommand(files),
    buildPrettierCommand(files),
    // "npm run markuplint:check",
    "npm run stylelint:check",
  ],
  "./**/*.{css,scss}": "npm run stylelint:check",
}

export default config
