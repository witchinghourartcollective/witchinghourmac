import "server-only";

import { Redis } from "@upstash/redis";

const redisUrl = process.env.REDIS_URL;
const redisToken = process.env.REDIS_TOKEN;

if (!redisUrl || !redisToken) {
  throw new Error("Missing REDIS_URL or REDIS_TOKEN environment variables.");
}

const redis = new Redis({
  url: redisUrl,
  token: redisToken,
});

export default redis;
