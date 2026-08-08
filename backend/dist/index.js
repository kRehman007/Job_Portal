import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user-route";
import jobRoutes from "./routes/job-routes";
import { AuthUser } from "./middlewares/user-auth-middleware";
const app = express();
//Middlewares...
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//Routes...
app.use("/api/validate-user", AuthUser, (req, res) => {
    res.status(200).json(req.user);
    return;
});
app.use("/api/user", userRoutes);
app.use("/api/job", jobRoutes);
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server is running at port no ${port}`));
