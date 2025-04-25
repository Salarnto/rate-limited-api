import express, { Request, Response } from 'express';
import { connectToRedis } from './configs/redis.js';
import rateLimiter from './middlewares/rateLimiter.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connections
connectToRedis();

// Middlewares
app.use(express.json());

// Routes
app.get('/api', rateLimiter, (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello World!'});
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));