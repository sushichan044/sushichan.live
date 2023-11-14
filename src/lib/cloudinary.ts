import { declareLet } from "@/utils/declareLet"

type ImageLoaderOption = {
  src: string
  width: number
  height?: number
  quality?: number
  crop?:
    | "fill"
    | "lfill"
    | "fill_pad"
    | "crop"
    | "thumb"
    | "scale"
    | "fit"
    | "limit"
    | "mfit"
    | "pad"
    | "lpad"
    | "mpad"
  blur?: boolean
  extraParams?: string[]
}

export const getCloudinaryIdentifier = (src: string) => {
  return src.replace("https://res.cloudinary.com/sushi-chan/image/upload/", "")
}

const cloudinaryLoaderBase = ({
  src,
  width,
  quality,
  crop = "limit",
  height = undefined,
  blur = false,
  extraParams = [],
}: ImageLoaderOption) => {
  // src = https://res.cloudinary.com/sushi-chan/image/upload/v1689696723/blog/my-first-walk/b1iajynl60c0uvmdapfi.jpg
  const imageIdentifier = getCloudinaryIdentifier(src)
  const params = [`c_${crop}`, `w_${width}`, `q_${quality || "auto"}`, "f_webp"]
  if (height) params.push(`h_${height}`)
  if (blur) params.push("e_blur:1600")
  if (extraParams.length > 0) params.push(...extraParams)
  return `https://res.cloudinary.com/sushi-chan/image/upload/${params.join(
    ",",
  )}/${imageIdentifier}`
}

export const cloudinaryMetadataLoader = (src: string) => {
  const imageIdentifier = getCloudinaryIdentifier(src)
  return `https://res.cloudinary.com/sushi-chan/image/upload/fl_getinfo/${imageIdentifier}`
}

export function cloudinaryLoader({ src, width, quality }: ImageLoaderOption) {
  return cloudinaryLoaderBase({ src, width, quality })
}

export function cloudinaryOGPLoader(src: string) {
  return cloudinaryLoaderBase({
    src,
    width: 1200,
    height: 630,
    quality: 80,
    crop: "lfill",
  })
}

export const getCloudinaryImageSize = async (
  url: string,
): Promise<{ width: number; height: number }> => {
  try {
    const res = await fetch(cloudinaryMetadataLoader(url))
    const isJson = res.headers.get("content-type")?.includes("application/json")
    const data = isJson ? await res.json() : await res.text()
    if (res.ok && isJson) {
      const width = declareLet(() => {
        if (data?.output?.width !== null) {
          return data?.output?.width
        }
        return 1200
      })
      const height = declareLet(() => {
        if (data?.output?.height !== null) {
          return data?.output?.height
        }
        return 900
      })
      return { width, height }
    } else {
      console.error(data)
    }
  } catch (e) {
    console.error(e)
  }

  return {
    width: 1200,
    height: 900,
  }
}
