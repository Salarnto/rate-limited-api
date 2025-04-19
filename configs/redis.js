import Redis from 'ioredis';

const { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } = process.env;

const redis = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
    retryStrategy: (times) => {
      if (times > 3) return null;
      return 2000;
    },
});

redis.on('error', (err) => {
    console.log('Redis error:', err);
});

redis.on('connect', () => {
    console.log('Redis connected');
  });

export default redis