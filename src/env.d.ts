// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type KVNamespace = import("@cloudflare/workers-types/experimental").KVNamespace
type ENV = {
  KV_BINDING: KVNamespace
}

type Runtime = import("@astrojs/cloudflare").AdvancedRuntime<ENV>

declare namespace App {
  interface Locals extends Runtime {
    user: {
      name: string
      surname: string
    }
  }
}
