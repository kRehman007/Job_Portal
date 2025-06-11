import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../db/prisma";
import { Role } from "@prisma/client";

console.log("secret", process.env.JWT_SECRET);
interface DecodedToken extends JwtPayload {
  userId: number;
}

declare global {
  namespace Express {
    export interface Request {
      user: any;
    }
  }
}

export const AuthUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Cookies:", req.cookies?.token ? "EXISTS" : "MISSING");
  console.log("Auth Header:", req.headers.authorization ? "EXISTS" : "MISSING");
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log("token", token);
  if (!token) {
    res.status(401).json({ error: "unAuthorized" });
    return;
  }
  console.log("token", token);
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;
    console.log("Decoded token:", decoded);
    if (!decoded.userId) {
      res.status(401).json({ error: "unAuthorized as Token expired " });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(decoded.userId) },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
      },
    });
    if (!user) {
      res.status(403).json({ error: "unAuthorized, user does not exists" });
      return;
    }
    req.user = user;

    next();
  } catch (error: any) {
    console.error("error in user-auth-middleware", error);
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({ error: "Invalid token" });
      return;
    }
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ error: "Token expired" });
      return;
    }
  }
};

export const verifyRole = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ error: "unAuthorized, no user found" });
      return;
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: "access deinied" });
      return;
    }
    next();
  };
};
