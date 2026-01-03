import express from 'express';
import multer from 'multer';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// MULTER CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const userId = req.user.userId;
    const safeName = file.originalname.replace(/\s+/g, '-');
    cb(null, `${userId}-${Date.now()}-${safeName}`);
  }
});

const upload = multer({ storage });

// FAKE DB
const images = [];

// POST /api/images
router.post('/', authMiddleware, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const image = {
    userId: req.user.userId,
    filename: req.file.filename
  };

  images.push(image);

  res.json(image);
});

// GET /api/images
router.get('/', authMiddleware, (req, res) => {
  const userImages = images.filter(img => img.userId === req.user.userId);
  res.json(userImages);
});

export default router;
