import { redisClient } from '../configs/redis.js';

const rateLimiter = async (req, res, next) => {
    try {
        const clientIp = req.ip;
        const key = `rate_limit:${clientIp}`;
        const limit = 5;
        const window = 60;
    
        const counter = await redisClient.incr(key);
    
        if (counter === 1) {
            await redisClient.expire(key, window); // Set expiry on first hit
        }
    
        if (counter > limit) {
            return res.status(429).json({ message: 'Too many requests!' });
        }

        next();

    } catch (error) {
        console.log('Redis error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export default rateLimiter