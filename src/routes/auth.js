import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// tài khoản DUY NHẤT
const USER = {
  id: 1,
  username: 'admin',
  password: 'Kobonto989'
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === USER.username && password === USER.password) {
    const token = jwt.sign(
      { userId: USER.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({ token });
  }

  res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu' });
});

export default router;
