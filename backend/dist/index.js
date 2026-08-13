import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import userRoutes from "./routes/user-route.js";
import jobRoutes from "./routes/job-routes.js";
import { AuthUser } from "./middlewares/user-auth-middleware.js";
import { UPLOADS_ROOT } from "./config/multer.js";
const app = express();
//Middlewares...
app.use(cors({
    origin: [process.env.FRONTEND_URI || "http://localhost:5173"],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(UPLOADS_ROOT));
app.get("/uploads-download/:folder/:name", (req, res) => {
    const { folder, name } = req.params;
    const allowedFolders = ["resume", "profile_picture", "company_logo"];
    if (!allowedFolders.includes(folder)) {
        res.status(400).json({ error: "Invalid folder" });
        return;
    }
    if (!/^[A-Za-z0-9._-]+$/.test(name)) {
        res.status(400).json({ error: "Invalid filename" });
        return;
    }
    const filePath = path.join(UPLOADS_ROOT, folder, name);
    res.download(filePath, name, (err) => {
        if (err && !res.headersSent) {
            res.status(404).json({ error: "File not found" });
        }
    });
});
//Routes...
app.use("/api/validate-user", AuthUser, (req, res) => {
    res.status(200).json(req.user);
    return;
});
app.use("/api/user", userRoutes);
app.use("/api/job", jobRoutes);
app.use((err, req, res, next) => {
    console.error("GLOBAL ERROR:");
    res.status(500).json({
        message: err.message,
        error: err,
    });
});
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server is running at port no ${port}`));
