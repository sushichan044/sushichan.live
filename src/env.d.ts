// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { AdvancedRuntime } from "@astrojs/cloudflare";
import type { KVNamespace } from "@cloudflare/workers-types";

type ENV = {
  KV_BINDING: KVNamespace;
};

declare namespace App {
  interface Locals extends AdvancedRuntime<ENV> {
    user: {
      name: string;
      surname: string;
    };
  }
}
