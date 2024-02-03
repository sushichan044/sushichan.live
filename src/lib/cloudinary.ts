import { declareLet } from "@/utils/declareLet"

type ImageLoaderOption = {
  blur?: boolean
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
    | "thumb"
  extraParams?: string[]
  height?: number
  quality?: number
  src: string
  width: number
}

export const getCloudinaryIdentifier = (src: string) => {
  return src.replace("https://res.cloudinary.com/sushi-chan/image/upload/", "")
}

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

export function cloudinaryLoader({ quality, src, width }: ImageLoaderOption) {
  return cloudinaryLoaderBase({ quality, src, width })
}

export function cloudinaryOGPLoader(src: string) {
  return cloudinaryLoaderBase({
    crop: "lfill",
    height: 630,
    quality: 80,
    src,
    width: 1200,
  })
}

const IMAGE_SIZE_CACHE = new Map<string, { height: number; width: number }>()

export const getCloudinaryImageSize = async (
  url: string,
): Promise<{ height: number; width: number }> => {
  const cached = IMAGE_SIZE_CACHE.get(url)
  if (cached) {
    return cached
  }

  try {
    const res = await fetch(cloudinaryMetadataLoader(url), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; +Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    })
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
      IMAGE_SIZE_CACHE.set(url, { height, width })
      return { height, width }
    } else {
      console.error(data)
    }
  } catch (e) {
    console.error("Error fetching image size for:", url)
    console.error(e)
  }

  return {
    height: 900,
    width: 1200,
  }
}
