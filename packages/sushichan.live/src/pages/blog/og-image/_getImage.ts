import type { CollectionEntry } from "astro:content";

import satori, { init } from "satori/wasm";
import initYoga from "yoga-wasm-web";
// @ts-expect-error wasm not typed
import yogaWasm from "yoga-wasm-web/dist/yoga.wasm";
import { svg2png, initialize as initializeSvg2Wasm } from "svg2png-wasm";
// @ts-expect-error wasm not typed
import svg2pngWasm from "svg2png-wasm/svg2png_wasm_bg.wasm";
import { getOptimizedFontUrl } from "../../../lib/google-font";
import { BlogOGP } from "./_BlogOGP";

init(await initYoga(yogaWasm));
await initializeSvg2Wasm(svg2pngWasm);

type Options = {
  post: CollectionEntry<"posts">;
};

const FONT_FAMILY = "Zen Maru Gothic";
const FONT_WEIGHT = 700;
const OGP_W = 1200;
const OGP_H = 630;
const DEFAULT_TEXTS = ["すしにっき"] as const;

export async function getBlogOGImage({ post }: Options) {
  const { title } = post.data;

  const optimizedFontUrl = await getOptimizedFontUrl({
    fontFamily: FONT_FAMILY,
    glyphs: [title, ...DEFAULT_TEXTS],
    weights: ["700"],
    format: "WOFF",
  });

  if (optimizedFontUrl == null) {
    throw new Error("Failed to resolve font");
  }

  const fontData = await fetch(optimizedFontUrl).then((res) =>
    res.arrayBuffer(),
  );

  const svg = await satori(BlogOGP({ fontFamily: FONT_FAMILY, title }), {
    fonts: [
      {
        data: fontData,
        name: FONT_FAMILY,
        style: "normal",
        weight: FONT_WEIGHT,
      },
    ],
    height: OGP_H,
    width: OGP_W,
  });

  return await svg2png(svg);
}
