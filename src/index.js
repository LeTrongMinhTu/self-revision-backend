import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import imageRoutes from './routes/images.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// static folder cho uploads
app.use('/uploads', express.static('uploads'));

// ROUTES
app.get('/', (req, res) => res.send('Backend is running'));
app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes);

// START SERVER
app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});
