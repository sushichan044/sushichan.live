import { createUnifont, providers } from "unifont";

import { createFSStorage } from "./unstorage";

type FontOptions = {
  fontFamily: string;
  glyphs: string[];
  weights: string[];
  format?: string;
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

  const font = await unifont.resolveFont(fontFamily, { weights });

  const remoteSources = font.fonts.flatMap((f) => {
    return f.src.filter((src) => {
      return "url" in src;
    });
  });

  if (format == null) {
    return remoteSources.at(0)?.url ?? null;
  }

  return (
    remoteSources.find((src) => {
      return src.format?.toLowerCase() === format?.toLowerCase();
    })?.url ?? null
  );
};
