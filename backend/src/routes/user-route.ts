import express from "express";
import {
  userLogin,
  userLogout,
  userSignup,
  UpdateUserProfile,
  getUserProfile,
} from "../controllers/user-controller";
import { AuthUser } from "../middlewares/user-auth-middleware";
import upload from "../config/multer";
const router = express.Router();
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/logout", AuthUser, userLogout);
router.put(
  "/update-profile",
  AuthUser,
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  UpdateUserProfile
);
router.get("/get-profile", AuthUser, getUserProfile);

export default router;
