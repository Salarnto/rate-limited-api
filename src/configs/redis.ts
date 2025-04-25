import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 100, 5000)
  }
});

// Connect to Redis
export const connectToRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.log('Redis connection failed:', error);
  }
};

redisClient.on('error', (error) => console.log('Redis connection error:', error));
redisClient.on('connect', () => console.log('Redis connected successfully'));
redisClient.on('end', () => console.log('Redis disconnected'));