import { createClient } from "redis";
const redis = createClient({ url: "redis://localhost:6379" });
redis.on("error", (err) => console.log("Redis Error:", err));
async () => {
    try {
        await redis.connect();
        console.log("Redis connected");
    }
    catch (error) {
        console.log("Error in connecting Redis", error);
    }
};
export default redis;
