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
    const publicIdWithExtension = parts[1].split(".")[0]; // Removes file extension
    return publicIdWithExtension;
  } catch (error) {
    console.error("Error extracting Cloudinary public ID:", error);
    return null;
  }
};
