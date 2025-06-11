import { Request, Response } from "express";
import prisma from "../db/prisma";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/generateTokenForUser";
import { Role } from "@prisma/client";
import cloudinary, { getCloudinaryPublicIdFromUrl } from "../config/cloudinary";
// import redis from "../config/redisClient";

export const userSignup = async (req: Request, res: Response) => {
  const { email, password, role, fullName } = req.body;
  if (!email || !password || !role || !fullName) {
    res.status(400).json({ error: "All fields are required" });
  }

  try {
    const isExists = await prisma.user.findUnique({ where: { email } });
    if (isExists) {
      res.status(400).json({ error: "Email already exists" });
      return;
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const createdUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        role: role.trim() as Role,
      },
      select: {
        fullName: true,
        id: true,
        email: true,
        role: true,
      },
    });

    res.status(201).json(createdUser);
    return;
  } catch (error: any) {
    console.error("error in user-controller-signup", error.message);
    res.status(500).json({ error: `Internal server error ${error.message}` });
    return;
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "All fields are required" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(400).json({ error: "email or password is incorrect" });
      return;
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user?.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ error: "email or password is incorrect" });
      return;
    }
    const token = generateToken(user?.id, res);
    res.status(200).json({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      token,
    });
    return;
  } catch (error: any) {
    console.error("error in user-controller-login", error.message);
    res.status(500).json({ error: `Internal server error ${error.message}` });
    return;
  }
};

export const userLogout = (req: Request, res: Response) => {

  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "user successfully logout " });
    return;
  } catch (error: any) {
    console.log("error in logout-controller", error.message);
    res.status(500).json({ error: `Internal server error ${error.message}` });
  }
};

export const UpdateUserProfile = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { bio, experience, skills, tagline, phoneNumber, gender } = req.body;

  if (!req.files) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }
  try {
    const existingProfile = await prisma.profile.findUnique({
      where: { userId },
    });

    let profilePicURL = existingProfile?.profilePic;
    let resumeURL = existingProfile?.resume;
    if (req.files && "profilePic" in req.files) {
      profilePicURL = req.files.profilePic[0].path;
    }
    if (req.files && "resume" in req.files) {
      resumeURL = req.files.resume[0].path;
    }
    if (existingProfile?.profilePic) {
      const publicId = getCloudinaryPublicIdFromUrl(existingProfile.profilePic);
      if (publicId) await cloudinary.uploader.destroy(publicId);
    }
    if (existingProfile?.resume) {
      const publicId = getCloudinaryPublicIdFromUrl(existingProfile.resume);
      if (publicId) await cloudinary.uploader.destroy(publicId);
    }

    const updatedProfile = await prisma.profile.upsert({
      where: { userId },
      update: {
        bio,
        experience: parseInt(experience),
        profilePic: profilePicURL,
        skills,
        tagline,
        resume: resumeURL,
        phoneNumber,
        gender,
      },
      create: {
        userId: parseInt(userId),
        bio,
        experience: parseInt(experience),
        profilePic: profilePicURL,
        skills,
        tagline,
        resume: resumeURL,
        phoneNumber,
        gender,
      },
    });
    // await redis.del(`profile-${req.user.id}`);
    res.status(201).json(updatedProfile);
    return;
  } catch (error: any) {
    console.log("error in creating-profile controller", error.message);
    res.status(500).json({ error: `Internal server error ${error.message}` });
    return;
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(400).json({ error: "UserId not found" });
    return;
  }
  try {
    // const cachedProfile = await redis.get(`profile-${req.user.id}`);
    // if (cachedProfile) {
    //   res.status(200).json(JSON.parse(cachedProfile));
    //   return;
    // }
    const userProfile = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        profile: true,
      },
    });
    if (!userProfile) {
      res.status(400).json({ error: "Profile not found" });
    }
    // await redis.set(`profile-${req.user.id}`, JSON.stringify(userProfile), {
    //   EX: 3600,
    // });
    res.status(200).json(userProfile);
    return;
  } catch (error: any) {
    console.log("error in geting userProfile-controller", error.message);
    res.status(500).json({ error: `Internal server error ${error.message}` });
  }
};
