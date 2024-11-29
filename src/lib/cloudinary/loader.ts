import { extractPublicId } from "./extract";

type ImageLoaderOption = {
  blur?: boolean;
  crop?:
    | "crop"
    | "fill"
    | "fill_pad"
    | "fit"
    | "lfill"
    | "limit"
    | "lpad"
    | "mfit"
    | "mpad"
    | "pad"
    | "scale"
    | "thumb";
  extraParams?: string[];
  height?: number;
  quality?: number;
  src: string;
  width: number;
};

const cloudinaryLoaderBase = ({
  blur = false,
  crop = "limit",
  extraParams = [],
  height = undefined,
  quality,
  src,
  width,
}: ImageLoaderOption) => {
  // src = https://res.cloudinary.com/sushi-chan/image/upload/v1689696723/blog/my-first-walk/b1iajynl60c0uvmdapfi.jpg
  const publicId = extractPublicId(src);
  const params = [
    `c_${crop}`,
    `w_${width}`,
    `q_${quality ?? "auto"}`,
    "f_webp",
  ];
  if (height != null) params.push(`h_${height}`);
  if (blur) params.push("e_blur:1600");
  if (extraParams.length > 0) params.push(...extraParams);
  return `https://res.cloudinary.com/sushi-chan/image/upload/${params.join(
    ",",
  )}/${publicId}`;
};

export function cloudinaryLoader({ quality, src, width }: ImageLoaderOption) {
  return cloudinaryLoaderBase({ quality, src, width });
}
