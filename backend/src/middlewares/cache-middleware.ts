import { NextFunction, Request, Response } from "express";
import redis from "../config/redisClient.js";

export const cacheMiddleware =
  (key: string) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cachedData = await redis.get(key);
      if (cachedData) {
        res.status(201).json(JSON.parse(cachedData));
        return;
      }
      next();
    } catch (error) {
      console.log("Reddis cache error", error);
    }
  };
