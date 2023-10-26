type ImageLoaderOption = {
  src: string
  width: number
  quality?: number
  blur?: boolean
}

export const getCloudinaryIdentifier = (src: string) => {
  return src.replace("https://res.cloudinary.com/sushi-chan/image/upload/", "")
}

const cloudinaryLoaderBase = ({
  src,
  width,
  quality,
  blur = false,
}: ImageLoaderOption) => {
  // src = https://res.cloudinary.com/sushi-chan/image/upload/v1689696723/blog/my-first-walk/b1iajynl60c0uvmdapfi.jpg
  const imageIdentifier = getCloudinaryIdentifier(src)
  const params = [
    "f_auto",
    "c_limit",
    `w_${width}`,
    `q_${quality || "auto"}`,
    "f_webp",
  ]
  if (blur) params.push("e_blur:1600")
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

export const getCloudinaryImageSize = async (
  url: string,
): Promise<{ width: number; height: number }> => {
  try {
    const res = await fetch(cloudinaryMetadataLoader(url))
    const isJson = res.headers.get("content-type")?.includes("application/json")
    const data = isJson ? await res.json() : await res.text()
    if (res.ok && isJson) {
      return {
        width: data?.input?.width,
        height: data?.input?.height,
      }
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
