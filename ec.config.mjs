import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections"
import { defineEcConfig } from "astro-expressive-code"

export default defineEcConfig({
  defaultLocale: "ja_JP",
  plugins: [pluginCollapsibleSections()],
  styleOverrides: {
    codeFontFamily:
      "'Fira Code', 'Noto Sans JP', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  themes: ["one-dark-pro"],
})
