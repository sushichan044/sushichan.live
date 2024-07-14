import { CLOUDINARY_URL } from "@/lib/cloudinary";

/**
 *  Extract public id from cloudinary url.
 *
 * This function does not decode URI components.
 * @param link
 * @returns
 */
const extractPublicId = (link: string): string => {
  if (!link) return "";

  return link
    .replace(/\/image\/upload\/v[0-9]+/, "")
    .replace(/\/image\/upload/, "")
    .replace(CLOUDINARY_URL, "")
    .replace(/\.[a-z]+$/, "");
};

const extractAndDecodePublicId = (link: string): string => {
  return decodeURIComponent(extractPublicId(link));
};

export { extractAndDecodePublicId, extractPublicId };
