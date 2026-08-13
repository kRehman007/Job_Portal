import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const UPLOADS_ROOT = path.resolve(__dirname, "../../uploads");
export const getUploadDir = (fieldname) => {
    if (fieldname === "profilePic")
        return "profile_picture";
    if (fieldname === "resume")
        return "resume";
    return "company_logo";
};
export const buildPublicUrl = (req, file) => `${req.protocol}://${req.get("host")}/uploads/${getUploadDir(file.fieldname)}/${file.filename}`;
const ALLOWED_RESUME_TYPES = ["application/pdf"];
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(UPLOADS_ROOT, getUploadDir(file.fieldname));
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname) || "";
        cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
    },
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const isResume = file.fieldname === "resume" &&
            ALLOWED_RESUME_TYPES.includes(file.mimetype);
        const isImage = file.fieldname !== "resume" && file.mimetype.startsWith("image/");
        if (isResume || isImage) {
            cb(null, true);
            return;
        }
        cb(new Error("Unsupported file type"));
    },
});
export default upload;
