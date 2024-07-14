import { getCloudinary } from "@/lib/cloudinary";

const IMAGE_SIZE_CACHE = new Map<string, { height: number; width: number }>();

export const getCloudinaryImageSize = async (
  url: string,
): Promise<{ height: number; width: number }> => {
  const cached = IMAGE_SIZE_CACHE.get(url);
  if (cached) {
    return cached;
  }

  const size = await getCloudinary().fetchImageSize(url);
  if (size) {
    IMAGE_SIZE_CACHE.set(url, size);
    return size;
  }

  return {
    height: 900,
    width: 1200,
  };
};
