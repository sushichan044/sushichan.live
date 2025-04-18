import type { CollectionEntry } from "astro:content";

import satori, { init } from "satori/wasm";
import initYoga from "yoga-wasm-web";
import yogaWasm from "yoga-wasm-web/dist/yoga.wasm";
import { svg2png, initialize as initializeSvg2Wasm } from "svg2png-wasm";
import svg2pngWasm from "svg2png-wasm/svg2png_wasm_bg.wasm";

init(await initYoga(yogaWasm));
await initializeSvg2Wasm(svg2pngWasm);

type Options = {
  post: CollectionEntry<"posts">;
};

const GOOGLE_FONT_NAME = "Zen+Maru+Gothic";
const FONT_FAMILY = "Zen Maru Gothic";
const FONT_WEIGHT = 700;
const OGP_W = 1200;
const OGP_H = 630;
const DEFAULT_TEXTS = ["すしにっき"] as const;

const getText = (text: string) => {
  // add title to default texts
  const texts = [...DEFAULT_TEXTS, text];
  return texts.join(" ");
};

export async function getBlogOGImage({ post }: Options) {
  const { title } = post.data;
  const fontData = await fetchFont(
    getText(title),
    GOOGLE_FONT_NAME,
    FONT_WEIGHT,
  );

  const svg = await satori(
    <div
      style={{
        backgroundColor: "#9ab3ca",
        display: "flex",
        fontFamily: FONT_FAMILY,
        height: "100%",
        letterSpacing: 0.05,
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          backgroundColor: "#fff",
          clipPath: "inset(32px round 16px)",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            textWrap: "balance",
            wordBreak: "keep-all",
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          alignItems: "center",
          bottom: "60px",
          display: "flex",
          fontSize: 40,
          fontWeight: 400,
          gap: "8px",
          position: "absolute",
          right: "60px",
        }}
      >
        <img
          alt="favicon"
          height={48}
          src="https://assets.sushichan044.workers.dev/icon-transparent.png"
          style={{
            top: "6px",
          }}
          width={48}
        />
        すしにっき
      </div>
    </div>,
    {
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
    },
  );

  return await svg2png(svg);
}

async function fetchFont(
  text: string,
  font: string,
  weight: number,
): Promise<ArrayBuffer> {
  const API = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(
    text,
  )}`;

  const css = await (
    await fetch(API, {
      headers: {
        // Make sure it returns TTF.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    })
  ).text();

  const resource = /src: url\((.+)\) format\('(opentype|truetype)'\)/.exec(css);

  if (!resource) {
    throw new Error("Failed to fetch font");
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const res = await fetch(resource[1]!);

  return res.arrayBuffer();
}
