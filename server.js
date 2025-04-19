import express from 'express';
import rateLimiter from './middlewares/rateLimiter.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

// Routes
app.get('/api', rateLimiter, (req, res) => {
    res.status(200).json({ message: 'Hello World!'});
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));