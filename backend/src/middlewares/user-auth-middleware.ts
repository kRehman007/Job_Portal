import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../db/prisma.js";
import { Role } from "@prisma/client";

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
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;

    if (!decoded.userId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(decoded.userId),
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(403).json({
        error: "Unauthorized, user does not exist",
      });
    }

    req.user = user;

    next();
  } catch (error: any) {
    console.error("Error in user-auth-middleware:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Token expired",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        error: "Invalid token",
      });
    }

    return res.status(500).json({
      error: "Authentication error",
    });
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
