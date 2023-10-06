import type { Config } from "@markuplint/ml-config"

const config: Config = {
  extends: ["markuplint:recommended-react"],
  specs: {
    "\\.[jt]sx$": "@markuplint/react-spec",
  },
  parser: {
    "\\.[jt]sx$": "@markuplint/jsx-parser",
    "\\.astro$": "@markuplint/astro-parser",
  },
  rules: {
    "attr-value-quotes": false,
    "deprecated-element": true,
    "class-naming": false,
    "required-h1": true,
    "require-accessible-name": true,
    "landmark-roles": false,
    "disallowed-element": true,
    doctype: "always",
    "deprecated-attr": true,
    "no-hard-code-id": false,
    "required-element": true,
    "character-reference": false,
    "case-sensitive-tag-name": false,
    "no-default-value": false,
    "wai-aria": true,
    "end-tag": false,
    "no-empty-palpable-content": false,
    "id-duplication": true,
    "permitted-contents": {
      options: {
        ignoreHasMutableChildren: true,
      },
    },
    "no-refer-to-non-existent-id": true,
    "no-boolean-attr-value": false,
    "required-attr": true,
    "invalid-attr": {
      options: {
        allowAttrs: ["{...props}"],
      },
    },
    "use-list": false,
    "case-sensitive-attr-name": false,
    "placeholder-label-option": true,
    "attr-duplication": true,
    "no-use-event-handler-attr": false,
    "ineffective-attr": false,
    "require-datetime": true,
    "label-has-control": false,
  },
  nodeRules: [
    {
      selector: "head",
      rules: {
        "permitted-contents": false,
        "required-element": false,
      },
    },
    {
      selector: "html",
      rules: {
        "permitted-contents": false,
      },
    },
  ],
}

export default config
