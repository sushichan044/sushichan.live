import { createUnifont, providers, ResolveFontOptions } from "unifont";

import { createFSStorage } from "./unstorage";

type FontOptions = {
  fontFamily: string;
  glyphs: string[];
  weights: string[];
  format?: ResolveFontOptions["formats"][number];
};

export const getOptimizedFontUrl = async (
  options: FontOptions,
): Promise<string | null> => {
  const { fontFamily, glyphs, weights, format } = options;

  const unifont = await createUnifont(
    [
      providers.google({
        experimental: {
          glyphs: {
            [fontFamily]: glyphs,
          },
        },
      }),
    ],
    {
      storage: createFSStorage("unifont-google"),
    },
  );

  const font = await unifont.resolveFont(fontFamily, {
    weights,
    formats: format ? [format] : undefined,
  });

  const remoteSources = font.fonts.flatMap((f) => {
    return f.src.filter((src) => {
      return "url" in src;
    });
  });

  return remoteSources.at(0)?.url ?? null;
};
