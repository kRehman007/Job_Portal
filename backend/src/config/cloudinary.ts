import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export const getCloudinaryPublicIdFromUrl = (url: string): string | null => {
  try {
    const parts = url.split("/upload/");
    if (parts.length < 2) return null;
    const withoutExtension = parts[1].split(".")[0]; // e.g. "v1234567/folder/name"
    const segments = withoutExtension.split("/");
    if (segments[0].startsWith("v") && /^\d+$/.test(segments[0].slice(1))) {
      segments.shift(); // Remove the version segment
    }
    return segments.join("/");
  } catch (error) {
    console.error("Error extracting Cloudinary public ID:", error);
    return null;
  }
};
