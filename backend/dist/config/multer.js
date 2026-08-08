import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary";
console.log("Multer Configuration Loaded");
const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        console.log("Processing File:", file); // ✅ Check if the file is received
        if (!file) {
            console.log("File not found in Multer middleware");
            throw new Error("No file provided");
        }
        console.log("File fieldname:", file.fieldname); // ✅ Check the fieldname
        return {
            folder: file.fieldname === "profilePic"
                ? "profile_picture"
                : file.fieldname === "resume"
                    ? "resume"
                    : file.fieldname === "companyLogo"
                        ? "company_logo"
                        : "other",
            public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
            format: file.mimetype.split("/")[1], // Ensure correct format
            resource_type: file.mimetype === "application/pdf" ? "raw" : "auto",
        };
    },
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        console.log("File Received:", file.originalname);
        cb(null, true); // Accept file
    },
});
export default upload;
