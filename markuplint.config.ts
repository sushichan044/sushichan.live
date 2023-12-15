import type { Config } from "@markuplint/ml-config"

const config: Config = {
  excludeFiles: ["**/node_modules/**/*", "**/dist/**/*"],
  extends: ["markuplint:recommended"],
  nodeRules: [
    {
      rules: {
        "permitted-contents": false,
        "required-element": false,
      },
      selector: "head",
    },
    {
      rules: {
        "permitted-contents": false,
      },
      selector: "html",
    },
    {
      rules: {
        "required-attr": false,
      },
      selector: "img",
    },
  ],
  parser: {
    "\\.[jt]sx$": "@markuplint/jsx-parser",
    "\\.astro$": "@markuplint/astro-parser",
  },
  rules: {
    "attr-duplication": true,
    "attr-value-quotes": false,
    "case-sensitive-attr-name": false,
    "case-sensitive-tag-name": false,
    "character-reference": false,
    "class-naming": false,
    "deprecated-attr": true,
    "deprecated-element": true,
    "disallowed-element": true,
    doctype: "always",
    "end-tag": false,
    "id-duplication": true,
    "ineffective-attr": false,
    "invalid-attr": {
      options: {
        allowAttrs: ["{...props}"],
      },
    },
    "label-has-control": false,
    "landmark-roles": false,
    "no-boolean-attr-value": false,
    "no-default-value": false,
    "no-empty-palpable-content": false,
    "no-hard-code-id": false,
    "no-refer-to-non-existent-id": true,
    "no-use-event-handler-attr": false,
    "permitted-contents": {
      options: {
        ignoreHasMutableChildren: true,
      },
    },
    "placeholder-label-option": true,
    "require-accessible-name": true,
    "require-datetime": true,
    "required-attr": true,
    "required-element": true,
    "required-h1": true,
    "use-list": false,
    "wai-aria": true,
  },
  specs: {
    "\\.[jt]sx$": "@markuplint/react-spec",
  },
}

export default config
