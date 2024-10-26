import astro from "@virtual-live-lab/eslint-config/presets/astro";
import react from "@virtual-live-lab/eslint-config/presets/react";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["worker-configuration.d.ts"],
  },
  ...astro,
  ...react,
);
