import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateToken = (userId: number, res: Response): string => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return token;
};
