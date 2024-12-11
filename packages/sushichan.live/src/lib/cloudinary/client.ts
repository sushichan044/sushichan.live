import {
  CLOUDINARY_API_SECRET,
  PUBLIC_CLOUDINARY_API_KEY,
  PUBLIC_CLOUDINARY_CLOUD_NAME,
} from "astro:env/server";
import { v2 as cloudinaryV2 } from "cloudinary";

import { extractAndDecodePublicId } from "./extract";

type CloudinaryCredentials = {
  api_key: string;
  api_secret: string;
  cloud_name: string;
};

class CloudinarySingleton {
  private static instance: CloudinarySingleton | null = null;
  get client() {
    return this.cloudinary;
  }
  private cloudinary: typeof cloudinaryV2;

  private imageSizeMap: Map<string, { height: number; width: number }> =
    new Map();

  private constructor(options: CloudinaryCredentials) {
    this.cloudinary = cloudinaryV2;
    this.cloudinary.config({
      secure: true,
      ...options,
    });
  }

  public static getInstance(
    options: CloudinaryCredentials,
  ): CloudinarySingleton {
    if (!CloudinarySingleton.instance) {
      CloudinarySingleton.instance = new CloudinarySingleton(options);
    }

    return CloudinarySingleton.instance;
  }

  public async fetchImageSize(src: string) {
    const publicId = extractAndDecodePublicId(src);

    if (this.imageSizeMap.has(publicId)) {
      return this.imageSizeMap.get(publicId);
    }

    let size: { height: number; width: number } | null = null;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const res = await this.cloudinary.api.resource(publicId);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (typeof res.height === "number" && typeof res.width === "number") {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        size = { height: res.height, width: res.width };
        this.imageSizeMap.set(publicId, size);
      }
    } catch (e) {
      console.error("Error fetching image size for:", src);
      console.error(e);
    }

    return size;
  }
}

const getCloudinary = () => {
  return CloudinarySingleton.getInstance({
    api_key: PUBLIC_CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    cloud_name: PUBLIC_CLOUDINARY_CLOUD_NAME,
  });
};

export { getCloudinary };
