import redis from "../config/redisClient";
export const cacheMiddleware = (key) => async (req, res, next) => {
    try {
        const cachedData = await redis.get(key);
        if (cachedData) {
            res.status(201).json(JSON.parse(cachedData));
            return;
        }
        next();
    }
    catch (error) {
        console.log("Reddis cache error", error);
    }
};
